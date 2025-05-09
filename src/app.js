import { DISNEY_API_URL } from "./constants/apiUrls.js";

const viewContainer = document.getElementById("page-content");

let characters = [];
let filteredCharacters = [];
let favorites = [];
let currentTab = "results";
let activeFilter = "all";
let searchTerm = "";
let currentCharacter = null;

const getFavorites = () => {
  const storedFavorites = localStorage.getItem("disneyFavorites");
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
};

const saveFavorites = () => {
  localStorage.setItem("disneyFavorites", JSON.stringify(favorites));
};

const applyFilter = () => {
  filteredCharacters = characters.filter((character) => {
    let filterMatch = true;
    const searchMatch = character.name.toLowerCase().includes(searchTerm);
    if (activeFilter === "movie") {
      filterMatch = character.films?.length > 0;
    } else if (activeFilter === "tvShow") {
      filterMatch = character.tvShows?.length > 0;
    }
    return searchMatch && filterMatch;
  });
  updateDisplay();
};

const updateDisplay = () => {
  const resultsGrid = document.getElementById("results-grid");
  if (!resultsGrid) return;

  if (currentTab === "results") {
    resultsGrid.characters = filteredCharacters;
  } else {
    resultsGrid.characters = favorites;
  }
  resultsGrid.favorites = favorites;
};

const toggleFavorite = (character, isFavorite) => {
  if (isFavorite) {
    favorites.push(character);
  } else {
    favorites = favorites.filter((fav) => fav._id !== character._id);
  }

  saveFavorites();
  updateDisplay();
};

const renderHome = () => {
  viewContainer.innerHTML = viewContainer.innerHTML = `
  <header>
    <h1>Disney Character Explorer</h1>
  </header>
  <div class="container">
    <div class="search-filter-container">
      <search-bar></search-bar>
      <filter-panel></filter-panel>
    </div>
    <div class="tabs">
      <button id="tab-results" class="tab-btn active">All Characters</button>
      <button id="tab-favorites" class="tab-btn">Favorites</button>
    </div>
    <div class="main-content" id="main-content">
      <results-grid id="results-grid"></results-grid>
    </div>
  </div> 
`;
  const resultsGrid = document.getElementById("results-grid");
  const tabResults = document.getElementById("tab-results");
  const tabFavorites = document.getElementById("tab-favorites");
  tabResults.addEventListener("click", () => {
    currentTab = "results";
    tabResults.classList.add("active");
    tabFavorites.classList.remove("active");
    updateDisplay();
  });

  tabFavorites.addEventListener("click", () => {
    currentTab = "favorites";
    tabFavorites.classList.add("active");
    tabResults.classList.remove("active");
    updateDisplay();
  });
  resultsGrid.characters = filteredCharacters;
  resultsGrid.favorites = favorites;
};

const renderProfile = () => {
  const profile = document.createElement("character-profile");
  profile.character = currentCharacter;
  viewContainer.innerHTML = "";
  viewContainer.appendChild(profile);
};

const handleRouteChange = () => {
  const hash = location.hash;
  if (hash.startsWith("#/profile/")) {
    const id = hash.split("/")[2];
    currentCharacter = characters.find(
      (c) => c._id.toString() === id.toString()
    );
    if (currentCharacter) {
      renderProfile();
    } else {
      renderHome();
    }
  } else {
    renderHome();
  }
};

const fetchCharacters = async () => {
  const resultsGrid = document.getElementById("results-grid");
  if (resultsGrid) resultsGrid.loading = true;

  try {
    const response = await fetch(DISNEY_API_URL);
    const data = await response.json();
    characters = Array.isArray(data.data) ? data.data : data;
    filteredCharacters = [...characters];
  } catch (error) {
    console.error("Error fetching Disney characters:", error);
  } finally {
    if (resultsGrid) resultsGrid.loading = false;
  }
};

window.addEventListener("hashchange", handleRouteChange);

// Custom dispatched events
document.addEventListener("search", (e) => {
  searchTerm = e.detail.value.toLowerCase();
  applyFilter();
});

document.addEventListener("filter", (e) => {
  activeFilter = e.detail.value;
  applyFilter();
});

document.addEventListener("character-favorite-toggle", (e) => {
  const { character, isFavorite } = e.detail;
  toggleFavorite(character, isFavorite);
});

document.addEventListener("character-view-details", (e) => {
  currentCharacter = e.detail.character;
  location.hash = `/profile/${currentCharacter._id}`;
});

const init = async () => {
  getFavorites();
  await fetchCharacters();
  handleRouteChange();
};
init();
