const detailsContainer = document.getElementById("pokemon-details");
const errorMessage = document.getElementById("error-message");

// Obtener el parámetro "name" de la URL
const params = new URLSearchParams(window.location.search);
const pokemonName = params.get("name");

// Cargar detalles del Pokémon
async function fetchPokemonDetails() {
  try {
    errorMessage.classList.add("hidden");
    if (!pokemonName) throw new Error("No se proporcionó el nombre del Pokémon.");

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) throw new Error("No se pudo obtener la información del Pokémon.");

    const pokemon = await response.json();
    displayPokemonDetails(pokemon);
  } catch (error) {
    console.error(error);
    errorMessage.textContent = "No se pudo cargar la información del Pokémon.";
    errorMessage.classList.remove("hidden");
  }
}

// Mostrar los detalles del Pokémon
function displayPokemonDetails(pokemon) {
  detailsContainer.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Altura:</strong> ${pokemon.height}</p>
    <p><strong>Peso:</strong> ${pokemon.weight}</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
  `;
}

// Iniciar la carga de detalles
fetchPokemonDetails();

