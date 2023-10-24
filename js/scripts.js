let pokemonRepository = (function(){
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type:['fire']},
    {name: 'Squirtle', height:0.5, type:['water']},
    {name: 'Pikachu', height:0.4, type:['electric']},
    {name: 'Abra', height:0.9, type:['psychic']},
    {name: 'Scyther', height:1.5 , type:['bug','flying']},
    {name: 'Moltres', height:2, type:['fire','flying']},
    {name: 'Lugia', height:5.2 , type:['psychic','flying']},
];

return {
  getAll: function(){
    return pokemonList;
  },
  add: function (item) {
      pokemonList.push(item);
}
} 
})();

pokemonRepository.getAll().forEach(function(pokemon){
  if (pokemon.height > 0) {
    document.write('<p>' +'This is' + " " + pokemon.name + ',' + " " + 'the height is:'+ " " + pokemon.height + 
    ' type: ' + pokemon.type + '.' +'</p>')}});
  
