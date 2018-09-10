
class Trainer {
  constructor(trainerData) {
    this.id = trainerData.id
    this.name = trainerData.name
    this.pokemons = trainerData.pokemons
    this.appendCard()
  }
  //


  addReleaseFunction(pokemon) {
    const releaseButton = document.querySelector(`[data-pokemon-id='${pokemon.id}']`)
    releaseButton.addEventListener('click', ()=> {
      this.pokemons = this.pokemons.filter( p => p != pokemon)
      releaseButton.parentElement.remove()
      fetch(BASE_URL + `/pokemons/${pokemon.id}`, {
        method: 'DELETE'
      }).then(res => res.json())
      .then(json => console.log(json))
    })
  }

  addAddFunction(){
    const addButton = document.querySelector(`[data-trainer-id='${this.id}']`)
    addButton.addEventListener('click', () => {
      if (this.pokemons.length < 6) {
        fetch(BASE_URL + '/pokemons', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({trainer_id: this.id})
        }).then(res => res.json()).then(json => {
          this.pokemons.push(json)
          this.addPokemon(json)
          console.log(this.pokemons)
        })
      } else {
        console.log("you already have 6 pokemon.")
      }
    })
  }

  appendCard(){
    const newCard = document.createElement('div')
    newCard.className = "card"
    newCard.innerHTML = `<p>${this.name}</p><button data-trainer-id=${this.id}>Add Pokemon</button><ul id="pokelist-${this.id}"></ul>`
    this.card = newCard
    document.querySelector('main').appendChild(this.card)
    this.pokemons.forEach( pokemon => {
      this.addPokemon(pokemon)
      this.addReleaseFunction(pokemon)
    })
    this.addAddFunction()
  }

  addPokemon(pokemon) {
    const newPoke = document.createElement('li')
    newPoke.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    document.getElementById(`pokelist-${this.id}`).append(newPoke)
    this.addReleaseFunction(pokemon)
  }


}
