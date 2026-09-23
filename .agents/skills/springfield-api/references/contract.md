# Contrato usado por la aplicación

Fuentes: [documentación](https://thesimpsonsapi.com/), [listado](https://thesimpsonsapi.com/api/characters?page=1), [detalle de Homer](https://thesimpsonsapi.com/api/characters/1). Referencia de integración del 2026-09-23, no un esquema exhaustivo de todos los recursos del servicio.

## Listado

`GET https://thesimpsonsapi.com/api/characters?page=1`

Forma de respuesta (tipos descriptivos, no código requerido para el proyecto):

```ts
type CharacterListResponse = {
  count: number;             // Total de personajes, variable
  pages: number;             // Total de páginas, variable
  next: string | null;       // URL absoluta; null en la última página
  prev: string | null;       // URL absoluta; null en la primera
  results: Character[];
};

type Character = {
  id: number;
  name: string;
  age: number | null;
  birthdate: string | null;  // Fecha YYYY-MM-DD cuando existe
  gender: string;
  occupation: string;
  portrait_path: string;
  phrases: string[];
  status: string;
};
```

Ejemplo reducido de un elemento (frases abreviadas, no listado completo):

```json
{
  "id": 1,
  "name": "Homer Simpson",
  "age": 39,
  "birthdate": "1956-05-12",
  "gender": "Male",
  "occupation": "Safety Inspector",
  "portrait_path": "/character/1.webp",
  "phrases": ["Doh!", "Why you little...!", "Woo-hoo!"],
  "status": "Alive"
}
```

La página se numera desde 1. El servidor usa 20 elementos por página, sin tamaño configurable documentado. La última puede contener menos. Los valores observados al crear la app fueron 1182 elementos y 60 páginas; son una observación histórica, no constantes de producto. La última página observada tenía 2 elementos.

## Detalle

`GET https://thesimpsonsapi.com/api/characters/1`

Devuelve directamente los campos de `Character` más información adicional observada:

| Campo | Forma y uso |
| --- | --- |
| `description` | Texto de biografía |
| `first_appearance_ep_id` | ID del primer episodio |
| `first_appearance_sh_id` | ID del primer corto |
| `first_appearance_ep` | Objeto del episodio: `id`, `name`, `season`, `episode_number`, `airdate`, `description`, `synopsis`, `image_path` |
| `first_appearance_sh` | Objeto del corto con campos análogos en la respuesta observada de Homer |

No dar por hecho que todos los personajes tienen biografía o apariciones; comprobar presencia y nulabilidad antes de acceder a relaciones. La ficha actual muestra `description` y, si existe, nombre/temporada/número de `first_appearance_ep`. El listado no sustituye la consulta de detalle para estos campos.

Valores conocidos de `status`: `Alive`, `Deceased`, `Unknown`; de `gender`: `Male`, `Female`, `Unknown`. Son ejemplos admitidos por la presentación, no enumeraciones cerradas garantizadas. Conservar fallbacks para valores nuevos, nulos o ausentes.

## Imágenes

Base utilizada: `https://cdn.thesimpsonsapi.com/500`.

```text
portrait_path: /character/1.webp
URL final:    https://cdn.thesimpsonsapi.com/500/character/1.webp
```

`/500` pertenece a la ruta CDN, no a la API JSON. La app valida retratos con `/^\/character\/[a-zA-Z0-9_.-]+$/`. No aceptar una URL arbitraria como si fuera una ruta de personaje. Esta validación pertenece a la app; no se presenta como contrato exhaustivo del proveedor.

El componente `Portrait` aplica fallback `?` con etiqueta accesible. Las primeras cuatro tarjetas cargan imágenes eager; las restantes lazy. Mantener proporciones con `object-fit: contain`. Para imágenes de otros recursos o resoluciones nuevas, confirmar sus rutas en la documentación antes de ampliar el componente.
