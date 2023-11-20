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
  let pokemonlist  = document.querySelector (".pokemon-list");
  let listpokemon = document.createElement ("li");
  let button = document.createElement ("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonlist.appendChild(listpokemon);
  button.addEventListener("click", () => {showDetails(pokemon)});
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
let modalContainer = document.querySelector(".modal-container");

function showModal(pokemon) {
  let modal = document.createElement("div");
  modal.classList.add("modal");


  let closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("modal-close");
  closeButtonElement.innerText = "Close";
  closeButtonElement.addEventListener("click", hideModal);

  let titleElement = document.createElement("h1");
  titleElement.innerText = 'Name' +': '+ pokemon.name;

  let contentElement = document.createElement("p");
  contentElement.innerText = 'Height' + ': ' + pokemon.height + "'";


  let myImage = document.createElement('img');
  myImage.src = pokemon.imageUrl; 
  modal.appendChild(myImage);

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  modalContainer.classList.add("is-visible");
}

let dialogPromiseReject;

function hideModal() {
  let modal = document.querySelector(".modal");
  modal.remove();

  if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
    hideModal();
  }
});

modalContainer.addEventListener("click", (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});


return {
  add: add,
  getAll: getAll,
  loadList: loadList,
  loadDetails: loadDetails,
  addListItem: addListItem,
  showDetails: showDetails
};
})();

// LOADS  DATA:

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
