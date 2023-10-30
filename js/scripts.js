let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";



function addListItem(pokemon) {
  let pokemonlist  = document.querySelector (".pokemon-list");
  let listpokemon = document.createElement ("li");
  let button = document.createElement ("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonlist.appendChild(listpokemon);
  button.addEventListener('click', function () {
    showDetails(pokemon.name);
  });
}

function loadList() {
  return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item) {
        let item = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    })
    .catch(function (e) {
      console.error(e);
    });
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

function add(pokemon) {
  if (
    typeof pokemon==="object" &&
    "name" in pokemon 
  ) {
    pokemonlist.push(pokemon);
  }else { 
  console.log("pokemon is not correct");
}
}
return {
  add: add,
  getAll: getAll,
  loadList: loadList,
  loadDetails: loadDetails
};
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});