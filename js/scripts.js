let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
      pokemonList.push(pokemon);
  }
  
  function getAll() {
    return pokemonList;
  }

  
//Creates the list of Pokemon buttons
function addListItem(pokemon) {
  let element = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  listItem.classList.add("list-group-item");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#exampleModal");
  button.classList.add("btn", "btn-outline-danger");
  button.classList.add('button-class');
  listItem.append(button);
  element.append(listItem);
  button.addEventListener("click", () => {
    showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        imageUrl: item.myImage,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

//modal

function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $("modal-header");
  
  modalTitle.empty();
  modalBody.empty();

// creating element name for name in modal
let nameElement = $("<h1>" + pokemon.name + "</h1>");
// creating image 
 let imageElementFront = $('<img class="image-container">');
imageElementFront.attr("src", pokemon.imageUrl);

// creating height
let heightElement = $("<p>" +"height : " + pokemon.height + "</p>");

modalTitle.append(nameElement);
modalBody.append(imageElementFront);
modalBody.append(heightElement);
$("#exampleModal").click(function () {
  $(button).toggle("modal");
});
}



return {
  getAll: function () {
    return pokemonList;
  },
  add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
};
})();

// LOADS  DATA:

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});

// handle search
const handleSearch = (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-input").value;
  // clear the pokemon list
  const pokemonListContainer = document.querySelector(".pokemon-list");
  pokemonListContainer.innerHTML = null;
  const pokemons = [...pokemonRepository.getAll()];

  console.log("pokemons", pokemons);

  pokemons.forEach((pokemon) => {
    if (pokemon.name.toLowerCase().includes(searchInput.trim().toLowerCase())) {
      pokemonRepository.addListItem(pokemon);
    }
  });
};

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", handleSearch);