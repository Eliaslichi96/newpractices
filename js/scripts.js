let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, type:['fire']},
    {name: 'Squirtle', height:0.5, type:['water']},
    {name: 'Pikachu', height:0.4, type:['electric']},
    {name: 'Abra', height:0.9, type:['psychic']},
    {name: 'Scyther', height:1.5 , type:['bug','flying']},
    {name: 'Moltres', height:2, type:['fire','flying']},
    {name: 'Lugia', height:5.2 , type:['psychic','flying']},
]
let text ="";
for (let i = 0; i < pokemonList.length; i++) {
    document.write(text + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")");
    if (pokemonList[i].height > 1)
    {document.write(' - Wow! That\'s a big one!');
} else {document.write(' - That\'s a smol one!');}
}