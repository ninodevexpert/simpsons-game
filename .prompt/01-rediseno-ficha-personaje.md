# Rediseño de la ficha de detalle del personaje

## Contexto
La app permite explorar los personajes de Los Simpson. Al pulsar una tarjeta se abre una ficha con el retrato, nombre, ocupación, edad, género, estado, biografía, primera aparición y frases. Queremos renovar su aspecto a partir del diseño de referencia que se adjunta.

## Historia de usuario
Como fan de Los Simpson, quiero que la ficha de cada personaje tenga una presentación más atractiva y clara, para disfrutar de su información de un vistazo.

## Objetivo
Adaptar la ficha de detalle al diseño de la imagen adjunta, respetando la identidad visual de Springfield y el comportamiento actual.

## Referencia visual
[Adjuntar imagen del diseño]
- Tomar la imagen como guía de estructura, jerarquía y estilo.
- Si algún elemento del diseño no tiene equivalente en los datos disponibles, no inventarlo: proponer la alternativa más cercana o indicarlo.

## Requisitos
- Mantener toda la información que ya muestra la ficha, reorganizada según el diseño.
- Conservar el comportamiento actual: apertura como ventana modal, cierre con botón, tecla Escape o clic fuera, y vuelta del foco a la tarjeta de origen.
- Las frases siguen mostrando 3 al abrir, con opción de «Ver más» / «Ver menos».
- Los estados de carga, error con reintento y datos ausentes deben seguir contemplados y encajar en el nuevo diseño.
- Debe verse bien en escritorio y en móvil, sin desbordamientos.
- Textos de interfaz en español; los datos de la API se mantienen en su idioma original.

## Criterios de aceptación
- La ficha se parece visualmente al diseño adjunto en escritorio y tiene una versión móvil coherente.
- Ningún dato existente desaparece de la ficha.
- Un personaje sin edad, sin biografía o sin frases se muestra correctamente.
- La ficha es navegable con teclado y mantiene el foco visible.
- El resto de la aplicación no cambia.

## Fuera de alcance
- Cambios en el listado de personajes, la paginación o la cabecera.
- Añadir nuevos datos o secciones que no estén en el diseño.

## Al terminar
Actualizar la guía de diseño del proyecto si el nuevo diseño cambia patrones documentados de la ficha.
