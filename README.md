# Springfield · Los personajes

Aplicación local con **React + Vite**, conectada a The Simpsons API. Incluye un catálogo paginado de 20 personajes por página y fichas en un diálogo accesible con retrato, biografía, edad, género, estado, primera aparición y frases.

## Ejecutar

Requiere Node.js 20.19+ o 22.12+.

```sh
npm install
npm run dev
```

Abre la dirección que indica Vite (normalmente http://127.0.0.1:5173).

```sh
npm run build
npm run preview
```

La compilación de producción se genera en `dist/`. No requiere claves ni servidor de datos propio. Necesita conexión a internet para consultar la API, obtener los retratos y cargar Google Fonts; las fuentes tienen alternativas locales.

## Estructura

- `src/main.jsx`: componentes React, consultas cancelables, caché de sesión, paginación y diálogo.
- `src/styles.css`: diseño responsive, tipografías y estados de interacción.
- `index.html`: metadatos y entrada de la aplicación.

Los controles están en español. Los datos se muestran en el idioma que devuelve la API. Las fichas se cierran con Escape, el botón de cierre o un clic fuera del diálogo. Los errores permiten reintentar y los retratos fallidos tienen un sustituto visual.

Fuente: https://thesimpsonsapi.com/. Datos de The Simpsons Wiki bajo CC BY-SA. Proyecto fan sin afiliación oficial.
