let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  
  function add(pokemon) {
      pokemonList.push(pokemon);
  }
  

//Creates the list of Pokemon buttons
function addListItem(pokemon) {
  let pokemonlist  = document.querySelector (".list-group"); //bootstrap
  let listpokemon = document.createElement ("li");
  listpokemon.classList.add('list-group-item'); //bootstrap
  // button inside li
  let button = document.createElement ("button");
  button.classList.add('btn'); // bootstrap 
  button.classList.add('btn-block');
  button.setAttribute('data-toggle', 'modal'); // bootstrap 
  button.setAttribute('data-target', '#modal'); // bootstrap 
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonlist.appendChild(listpokemon);
  button.addEventListener("click", () => {showDetails(pokemon)});
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


function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}


//modal

function showModal(item) {
  
  let modalBody = document.querySelector('.modal-body');
  let modalTitle = document.querySelector('.modal-title');
  let modalHeader = document.querySelector('.modal-header');


  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';

  // creating element for  modal 
  let nameElement = document.createElement('h1');
  nameElement.innerText = item.name;
  // IMAGE 
  let imageElement = document.createElement('img');
  imageElement.classList.add('modal-img');
  imageElement.setAttribute('src', item.imageUrl);
  imageElement.classList.add('float-right'); // bootstrap
        
   // Height         
  let contentElement = document.createElement("p");
  contentElement.innerText = 'Height' + ': ' + item.height + "'";

  modalTitle.appendChild(nameElement);
  modalBody.appendChild(imageElement);
  modalBody.appendChild(heightElement);
}


return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal
};
})();

// LOADS  DATA:

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
