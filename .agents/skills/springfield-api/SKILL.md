---
name: springfield-api
description: Integrar y mantener The Simpsons API en este proyecto para personajes, respuestas JSON, paginación, fichas de detalle, retratos CDN, caché y estados de carga o error.
---

# The Simpsons API en Springfield

Usar esta skill para tareas de datos en este repositorio. Leer [el contrato de respuestas](references/contract.md) al modificar campos, paginación o endpoints. La implementación actual está en `src/main.jsx`, relativa a la raíz del proyecto.

## Integración existente

- REST pública sin clave: `https://thesimpsonsapi.com/api`.
- Listado: `GET /characters?page=N`; página inicial 1, tamaño fijo 20, última página posiblemente incompleta.
- Detalle: `GET /characters/{id}`; devuelve un objeto enriquecido, no un array ni un sobre `results`.
- Retratos: `https://cdn.thesimpsonsapi.com/500` + `portrait_path`. Ejemplo: `/character/1.webp` produce `https://cdn.thesimpsonsapi.com/500/character/1.webp`.
- No deducir el retrato del ID: utilizar la ruta recibida. Reutilizar `Portrait`, que valida la ruta de personaje y muestra un sustituto si falta o falla la imagen.

## Flujo y límites

1. Reutilizar `getJSON`: comprobar `response.ok` antes de leer JSON. No asumir un formato específico de cuerpo de error.
2. Mantener peticiones cancelables con `AbortController` al cambiar de página, cerrar la ficha o desmontar. Una respuesta obsoleta no debe reemplazar la selección actual ni generar un error visible por una cancelación normal.
3. `pageCache` indexa páginas y `detailCache` IDs. Son `Map` en memoria, sin persistencia tras recarga. No introducir almacenamiento permanente o precargar todo el catálogo sin necesidad explícita.
4. Mostrar los datos del listado al abrir la ficha y completar con el detalle bajo demanda. Si falla el detalle, conservar los datos ya disponibles y permitir reintentar.
5. Obtener `count` y `pages` de cada respuesta; no fijar 1182 personajes ni 60 páginas. Rango: `(page - 1) * 20 + 1` hasta `(page - 1) * 20 + results.length`; tratar una lista vacía sin producir un rango invertido.
6. Desactivar navegación durante carga y en los extremos. La app construye las URLs desde la base fija y el número de página; `next` y `prev` son metadatos, no índices.
7. Mantener carga, vacío, error y reintento diferenciados. No convertir un fallo de red en una lista vacía exitosa.

## Presentación de datos

- `age` puede ser nulo: comprobar `!= null`, sin perder una edad 0. No corregir edades inusuales por suponer que son imposibles.
- `phrases` puede estar vacío. Mostrar tres al inicio y desplegar el resto a petición, conforme a la skill de diseño.
- Traducir etiquetas conocidas mediante `statusLabel` y `genderLabel`, preservando valores desconocidos. La interfaz está en español; ocupación, biografía y frases mantienen el idioma original.
- Renderizar texto mediante React, sin `dangerouslySetInnerHTML` para contenido de la API.
- No asumir búsqueda, filtros, ordenación, tamaño de página configurable ni límites de frecuencia concretos: confirmar soporte oficial antes de implementar esas capacidades.
- Episodios y localizaciones existen en el servicio, pero no forman parte del flujo actual. Consultar sus contratos oficiales si se solicitan; no extrapolar campos desde personajes.

## Verificación y mantenimiento

Documentación: [The Simpsons API](https://thesimpsonsapi.com/). Contrato contrastado con la documentación y respuestas utilizadas por la app el 2026-09-23; puede cambiar. Si un dato nuevo contradice esta referencia, verificar con una respuesta real y actualizarla. No es necesario descargar todo el catálogo.

Tras cambios de integración, comprobar primera página, cambio de página, última página incompleta y detalle con valores ausentes según lo afectado. Verificar errores/cancelación cuando se cambie ese flujo y ejecutar `npm run build`. Mantener la atribución a The Simpsons API y The Simpsons Wiki del pie.
