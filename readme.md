# Pokedex Web App

Esta es una aplicación web diseñada para dispositivos móviles que permite explorar información de Pokémon obtenida directamente desde la [Pokémon API](https://pokeapi.co/). Los usuarios pueden visualizar una lista de Pokémon, filtrarlos por tipo, y acceder a información detallada de cada uno.

---

## Funcionalidades

1. **Lista de Pokémon**: Muestra hasta 500 Pokémon utilizando paginación para facilitar la navegación.
2. **Filtro por tipo**: Permite filtrar Pokémon según su tipo, como fuego, agua, planta, entre otros.
3. **Detalles**: Al hacer clic en un Pokémon, se puede acceder a una página con información detallada, como su altura, peso y habilidades.
4. **Diseño Responsive**: Adaptado para dispositivos móviles y escritorio.
5. **Gestión de errores**: Notifica al usuario en caso de problemas al conectar con la API.

---


---

## Preguntas respondidas

### 1. ¿Por qué elegiste esa API?

Elegí la **Pokémon API** porque:
- Es gratuita, bien documentada y fácil de usar.
- Contiene datos interesantes y populares que hacen el proyecto más atractivo.
- Ofrece una amplia cantidad de información, como nombres, imágenes, tipos y estadísticas de los Pokémon, lo que permite implementar varias funcionalidades interactivas.

### 2. ¿Qué problemas tuviste y cómo los solucionaste?

#### Problemas encontrados:
1. **Cargar una gran cantidad de Pokémon**: 
   - El límite inicial de la API (500 Pokémon) generó problemas al cargar todos los datos debido a múltiples solicitudes en paralelo.
   - **Solución**: Implementé paginación para dividir la carga de datos en bloques más manejables.
   
2. **Filtrar por tipo de Pokémon**: 
   - La API proporciona datos de tipo en un formato diferente al de la lista principal de Pokémon, lo que complicó el filtrado.
   - **Solución**: Implementé una función que cruza los datos entre las dos rutas de la API (`/pokemon` y `/type`) para obtener solo los Pokémon que coinciden con el tipo seleccionado.

3. **Errores al obtener detalles**:
   - Si fallaba la conexión con la API, la página mostraba un error genérico.
   - **Solución**: Añadí un manejo de errores claro con mensajes visibles para el usuario y depuración en consola para identificar problemas técnicos.

4. **Diseño responsive**:
   - El diseño inicial no se veía bien en pantallas pequeñas.
   - **Solución**: Usé CSS Grid y ajustes en tamaños de fuente e imágenes para mejorar la usabilidad en dispositivos móviles.

### 3. Ponte una nota del 1 al 10, explica por qué te la pones y qué crees que podrías mejorar.

#### Nota: **9/10**

- **Motivo**: El proyecto cumple con todos los requisitos planteados, tiene un diseño limpio y es funcional tanto en dispositivos móviles como en escritorio. Además, se implementaron características avanzadas como paginación y filtrado.
  
- **Aspectos a mejorar**:
  1. Optimizar la carga de datos para manejar incluso más Pokémon (usando paginación desde el servidor).
  2. Añadir una barra de búsqueda por nombre para facilitar la navegación.
  3. Incluir más detalles en la página de cada Pokémon, como estadísticas de combate o evoluciones.

---

## Cómo usar este proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/web-movil-api.git


