# Nueva sección de Episodios

## Contexto
Actualmente la app solo muestra personajes. La cabecera ya tiene un menú con la opción «Personajes». The Simpsons API ofrece también el catálogo de episodios en https://thesimpsonsapi.com/api/episodes (listado paginado de unos 770 episodios, con detalle por episodio).

## Historia de usuario
Como fan de Los Simpson, quiero acceder a un listado de episodios desde el menú, para consultar de qué trata cada capítulo y cuándo se emitió.

## Objetivo
Añadir la opción «Episodios» al menú principal y crear una sección que permita explorar los episodios con la misma experiencia que la de personajes.

## Requisitos
- Nueva opción «Episodios» en el menú, junto a «Personajes», indicando claramente cuál está activa. Se puede cambiar entre ambas en cualquier momento.
- Listado de episodios en tarjetas con su imagen, título, temporada y número de episodio.
- Paginación equivalente a la de personajes, con total de episodios y página actual.
- Al pulsar un episodio se abre su ficha con imagen, título, temporada, número, fecha de emisión, sinopsis y descripción.
- Algunos episodios no tienen fecha de emisión u otros datos: mostrar un texto alternativo en lugar de huecos o valores erróneos.
- Estados de carga, error con reintento e imagen no disponible, igual que en personajes.
- Mismo estilo visual de Springfield, responsive y accesible por teclado.
- Textos de interfaz en español; título, sinopsis y descripción en el idioma original de la API.

## Criterios de aceptación
- Desde el menú se accede a Episodios y se vuelve a Personajes sin errores ni recargas innecesarias.
- Se navega por todas las páginas de episodios, incluida la última.
- La ficha de episodio abre y cierra igual que la de personajes.
- Un episodio con datos incompletos se muestra correctamente.
- La sección de personajes sigue funcionando exactamente igual.

## Fuera de alcance
- Búsqueda, filtros por temporada u ordenación (salvo que la API lo soporte oficialmente y se pida).
- Relacionar episodios con personajes.

## Al terminar
Consultar el contrato real de episodios antes de implementar (no suponer campos a partir de personajes) y actualizar la documentación del proyecto con el nuevo recurso y la nueva sección.
