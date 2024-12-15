const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=500";
const TYPES_API_URL = "https://pokeapi.co/api/v2/type";
const pokemonList = document.getElementById("pokemon-list");
const paginationContainer = document.getElementById("pagination");
const filterSelect = document.getElementById("filter-select");
const errorMessage = document.getElementById("error-message");

let allPokemon = [];
let filteredPokemon = [];
let currentPage = 1;
const itemsPerPage = 20;

// Función para cargar los Pokémon desde la API
async function fetchPokemon() {
  try {
    errorMessage.classList.add("hidden");
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al conectar con la API");

    const data = await response.json();
    allPokemon = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        if (!detailsResponse.ok) throw new Error("Error al obtener detalles");
        return await detailsResponse.json();
      })
    );

    filteredPokemon = allPokemon;
    displayPokemon();
    setupPagination();
    await fetchPokemonTypes(); // Cargar los tipos de Pokémon en el filtro
  } catch (error) {
    console.error(error);
    errorMessage.textContent = "No se pudieron cargar los Pokémon. Inténtalo más tarde.";
    errorMessage.classList.remove("hidden");
  }
}

// Función para mostrar los Pokémon según la página actual
function displayPokemon() {
  pokemonList.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pokemonToShow = filteredPokemon.slice(startIndex, endIndex);

  pokemonToShow.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <a href="details.html?name=${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>${pokemon.name}</p>
      </a>
    `;
    pokemonList.appendChild(listItem);
  });
}

// Configurar la paginación
function setupPagination() {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-button");
    if (i === currentPage) button.classList.add("active");

    button.addEventListener("click", () => {
      currentPage = i;
      displayPokemon();
    });

    paginationContainer.appendChild(button);
  }
}

// Cargar los tipos de Pokémon para el filtro
async function fetchPokemonTypes() {
  try {
    const response = await fetch(TYPES_API_URL);
    if (!response.ok) throw new Error("Error al cargar los tipos de Pokémon");

    const data = await response.json();
    data.results.forEach((type) => {
      const option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.name;
      filterSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

// Filtrar Pokémon por tipo
async function filterByType(type) {
  if (type === "all") {
    filteredPokemon = allPokemon;
  } else {
    try {
      const response = await fetch(`${TYPES_API_URL}/${type}`);
      if (!response.ok) throw new Error("Error al cargar los Pokémon de este tipo");

      const data = await response.json();
      const pokemonOfType = data.pokemon.map((p) => p.pokemon.name);
      filteredPokemon = allPokemon.filter((pokemon) => pokemonOfType.includes(pokemon.name));
    } catch (error) {
      console.error(error);
      errorMessage.textContent = "Error al filtrar los Pokémon.";
      errorMessage.classList.remove("hidden");
    }
  }
  currentPage = 1; // Reiniciar a la primera página
  displayPokemon();
  setupPagination();
}

// Event listener para el filtro de tipos
filterSelect.addEventListener("change", (e) => {
  filterByType(e.target.value);
});

// Iniciar la carga de Pokémon
fetchPokemon();
