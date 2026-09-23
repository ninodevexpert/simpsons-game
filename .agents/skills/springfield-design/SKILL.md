---
name: springfield-design
description: Mantener la guía visual de Springfield al crear o modificar interfaz, botones, tarjetas, modales, estilos y responsive en este proyecto React. Aplicar también en revisiones de coherencia visual.
---

# Diseño de Springfield

Aplicar esta guía dentro de este repositorio. Partir de `src/styles.css`, los componentes de `src/main.jsx` y las fuentes de `index.html` (rutas relativas a la raíz del proyecto). Reutilizar patrones existentes antes de introducir variantes. Esta guía conserva el diseño aprobado; una petición explícita de rediseño puede cambiarlo.

## Identidad y tokens

Estética de cómic de Los Simpson: amarillo vivo, contornos oscuros, azul cielo, superficies claras y sombras duras sin desenfoque en controles. Reservar las pequeñas rotaciones y el movimiento para acentos y hover, evitando perjudicar la lectura.

| Token o uso | Valor actual | Aplicación |
| --- | --- | --- |
| `--yellow` | `#ffd523` | Cabecera, pie, botones destacados, selección |
| `--ink` | `#20251e` | Texto, contornos, sombras |
| `--paper` | `#fafaf5` | Fondo y diálogo |
| `--blue` | `#d9eff8` | Fondo del retrato de detalle |
| `--pink` | `#f7b8cf` | Acento disponible; no forzar su uso |
| `--line` | `#deded3` | Separadores y bordes discretos |
| Azul de título | `#307bb2` | Acento en encabezado principal |
| Foco visible | `#2671c2` | Outline de 3 px, separación de 5 px |

Reutilizar variables CSS; no duplicar la paleta en cada componente. Los fondos de tarjetas alternan los colores de `colors` en `src/main.jsx`, pasados como `--card-color`; son decorativos, no indican estado.

Tipografías: **Bangers**, con alternativas `Impact, sans-serif`, para marca, título principal y nombre del personaje en el diálogo; **DM Sans**, con alternativa `sans-serif`, para controles, contenido y títulos de tarjetas. Las fuentes se cargan desde Google Fonts en `index.html`. No presentar Bangers como la fuente oficial de la serie.

## Botones y controles

- Acciones destacadas: patrón `.quotes-toggle` o `.retry`, amarillo, texto oscuro en negrita, borde de 1–1.5 px y radio de 7–8 px. Hover con sombra dura discreta cuando corresponda.
- Navegación: `.page-step`, fondo transparente y borde fino; hover amarillo. Números de página con `.page-numbers`; selección amarilla, contorno oscuro, sombra de 2 px y `aria-current="page"`.
- Cierre de modal: `.close`, círculo de 37 px con borde oscuro, fondo claro y hover amarillo; nombre accesible «Cerrar ficha».
- Usar botones nativos para acciones y enlaces para navegación. Mantener `:focus-visible`, estados `disabled` reales y etiquetas accesibles. Los iconos meramente decorativos llevan `aria-hidden`.
- Añadir nuevos controles con estos patrones sin instalar otra biblioteca visual solo para cambiar su apariencia.

## Tarjetas y cajas

- `.card`: superficie blanca, contorno de 1.5 px, radio de 13 px, recorte interior. Toda la tarjeta es el botón de apertura; no anidar botones o enlaces dentro.
- `.card-art`: fondo pastel, retrato con `object-fit: contain`, alineado abajo; identificador arriba. Usar `Portrait` para conservar su fallback.
- `.card-body`: nombre destacado y ocupación secundaria limitada a dos líneas; el detalle muestra el texto completo.
- Hover de tarjeta: elevación de 5 px, giro de -0.5 grados, sombra dura de 4 × 5 px; escala del retrato 1.05. Respetar `prefers-reduced-motion`.
- `.error-box`: fondo amarillo pálido, borde y radio de 12 px, explicación breve y reintento. `.skeleton` reserva espacio mientras carga; no sustituir errores por datos inventados.

## Ficha de detalle y contenido progresivo

Conservar `<dialog>` y `showModal()`: máximo 810 px de ancho, margen lateral mínimo de 16 px, máximo 88dvh, radio de 20 px y fondo atenuado. Escritorio: retrato a la izquierda y datos a la derecha. Móvil: retrato encima.

Mantener cierre por botón, Escape y clic fuera; bloquear el scroll de fondo y devolver el foco a la tarjeta que abrió la ficha. Relacionar el diálogo con su título mediante `aria-labelledby`.

**Preferencia explícita del usuario:** «En sus propias palabras» muestra como máximo **3 frases inicialmente**. Si hay más, mostrar «Ver más (N) ↓», donde N es el número restante. El usuario despliega el resto hacia abajo; «Ver menos ↑» vuelve a compactarlo. No mostrar el control con tres frases o menos. Usar `aria-expanded` y `aria-controls`; cada nueva apertura comienza plegada. No expandir por hover ni automáticamente al cargar el detalle.

Conservar `.quotes li`: fondo `#fff3b5`, borde izquierdo amarillo de 3 px, padding de 12 × 15 px, interlineado 1.5. Evitar añadir secciones largas siempre abiertas al modal sin necesidad de la tarea.

## Distribución, texto y verificación

- Contenedor centrado de hasta 1440 px, margen interior del 6% (5% en móvil).
- Galería de 4 columnas; 3 a anchuras de 1000 px o menos; 2 a 700 px o menos. Separaciones actuales de 22/18/13 px.
- A 700 px, ficha en una columna y retrato decorativo de cabecera oculto. A 380 px, paginación con números en una fila adicional.
- Interfaz en español, tono cercano con guiños breves a Springfield. No traducir ni inventar biografías/frases de la API sin petición del usuario.
- Para cambios visuales, comprobar la interacción afectada y anchuras móvil/escritorio sin desbordamiento horizontal. Verificar foco, contenido largo y estados de carga/error relevantes. Ejecutar `npm run build` tras cambios de aplicación.
