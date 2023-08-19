const pokemonList = document.getElementById("pokemonList");
const LoadMoreButton = document.getElementById("loadMoreButton")
const maxRecords = 152
const limit = 20
let offSet = 0;

function loadPokemonItens(offSet, limit) {
    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
                            
                            <div class="detail"> 
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                                <img src="${pokemon.avatar}" alt="${pokemon.name}">
                            </div>
                        </li>`).join('')
        pokemonList.innerHTML += newHtml

    })

}

loadPokemonItens(offSet, limit)

LoadMoreButton.addEventListener('click', () => {
    offSet += limit
    const qtdRecordNextPage = offSet + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offSet
        loadPokemonItens(offSet, newLimit)

        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
    } else {
        loadPokemonItens(offSet, limit)
    }
})