var pokemonRepository = (function(){
  let repository = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type:['fire']},
    {name: 'Squirtle', height:0.5, type:['water']},
    {name: 'Pikachu', height:0.4, type:['electric']},
    {name: 'Abra', height:0.9, type:['psychic']},
    {name: 'Scyther', height:1.5 , type:['bug','flying']},
    {name: 'Moltres', height:2, type:['fire','flying']},
    {name: 'Lugia', height:5.2 , type:['psychic','flying']},
];

function add(pokemon) {
  if (
    typeof pokemon==="object" &&
    "name" in pokemon &&
    "height" in pokemon && 
    "type" in pokemon
  ) {
    repository.push(pokemon);
  }else { 
  console.log("pokemon is not correct");
}
}

function getAll () {
  return repository;
}

function showDetails(pokemon){
  console.log(pokemon)
 }; 

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

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
};
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add ({ name: " pikachu", height: 0.3, type:["electric"
] });

pokemonRepository.getAll().forEach(function (pokemon){
  pokemonRepository.addListItem(pokemon);
  });