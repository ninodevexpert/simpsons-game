# Juego: ¿Quién es este vecino?

## Contexto
La app dispone de más de mil personajes con retrato. Queremos aprovecharlos para crear un juego de preguntas que ponga a prueba cuánto conoce el usuario a los habitantes de Springfield.

## Historia de usuario
Como fan de Los Simpson, quiero jugar a adivinar personajes por su imagen, para divertirme y comprobar cuántos reconozco.

## Objetivo
Crear un juego accesible desde el menú principal en el que el usuario identifique personajes a partir de su retrato.

## Mecánica
- La partida tiene **5 rondas**.
- En cada ronda aparecen **4 retratos de personajes**. Cada retrato tiene **4 opciones de nombre** y solo una es correcta.
- Al responder se indica al momento si se ha acertado y, en caso de fallo, cuál era la respuesta correcta.
- Cuando se han respondido los 4 retratos, se puede pasar a la siguiente ronda.
- Al terminar las 5 rondas se muestra el resultado final (aciertos sobre el total) con un mensaje acorde a la puntuación, y la opción de jugar otra vez.

## Reglas de contenido
- Los personajes se eligen al azar entre todo el catálogo, sin repetirse en la misma partida.
- Solo se usan personajes con retrato disponible.
- Las opciones incorrectas son nombres de otros personajes reales y no se repiten dentro de la misma pregunta.
- El orden de las opciones es aleatorio.
- Cada nueva partida es diferente a la anterior.

## Experiencia
- Nueva opción «Juego» en el menú, junto al resto de secciones.
- Pantalla de inicio breve con las reglas y un botón para empezar.
- Progreso visible: ronda actual y aciertos acumulados.
- Estados de carga y de error con opción de reintentar; no empezar una ronda si faltan datos.
- Estilo visual de Springfield, tono cercano con guiños a la serie, responsive y jugable con teclado.
- Textos de interfaz en español; nombres de personajes tal como vienen de la API.

## Criterios de aceptación
- Una partida completa tiene 5 rondas con 4 retratos y 4 opciones cada uno.
- Siempre hay exactamente una opción correcta por retrato.
- No se puede cambiar una respuesta ya dada.
- El resultado final coincide con los aciertos reales.
- «Jugar otra vez» inicia una partida nueva desde cero.
- Las secciones existentes siguen funcionando igual.

## Fuera de alcance
- Guardar puntuaciones o rankings entre sesiones.
- Temporizador, niveles de dificultad o modo multijugador.

## Al terminar
Evitar descargar todo el catálogo para montar la partida; pedir solo los datos necesarios. Documentar la nueva sección en el proyecto.
