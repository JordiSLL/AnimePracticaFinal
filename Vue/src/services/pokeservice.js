import axios from 'axios'

const pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type':'application/json'
  }
})

export default {
  getPokemons() {
    return pokeAPI.get('/pokemon?limit=10')
  },
  getSinglePokemon( id ) {
    return pokeAPI.get('/pokemon/' + id )
  },
  getRandomPokemon( offset ) {
    return pokeAPI.get('/pokemon?limit=8&offset=' + offset)
  }
}