
<script setup>


import { onMounted, ref } from 'vue'
import pokeservice from '@/services/pokeservice.js';
import PokeCard from '@/components/PokeCard.vue';

const pokemons = ref([]);

const loaded = ref('loading...')

const usePokemon = ref('');

onMounted(() => {
  console.log(`the component is now mounted.`)

  pokeservice.getPokemons()
              .then( info => info.data.results )
              .then( data => {
                console.dir(data)
                data.forEach(el => {
                  pokemons.value.push(el);
                });
                loaded.value = 'loaded!!';
                /* pintar els pokemons */
              }) 

})

const selectCard = (card) => {
  usePokemon.value = card
}


// const pokes = ['pikachu','charmander','blastoise']

// const pokeobj = [
//   {id:1, name:'pikachu'},
//   {id:2, name:'charmander'},
//   {id:3, name:'blastoise'}
// ]

</script>


<template>
  <main>
    <h1>Pokemons</h1>
    <p>{{loaded}}</p>

    <p>{{ usePokemon }}</p>

    <!-- <ul>
      <li v-for="pokemon in pokes">{{ pokemon }}</li>
    </ul>

    <div v-for="pk in pokeobj" :key="pk.id">{{ pk.name }}</div> -->

  <!-- <section class="cards">
      <div class="card" v-for="pokemon in pokemons" :key="pokemon.name">{{ pokemon.name }}</div>
  </section> -->

  <section class="cards">
      <PokeCard v-for="pokemon in pokemons" :key="pokemon.name" :pokename="pokemon" @selection="selectCard" />
  </section>



  </main>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}
.card{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid yellow;
  border-radius: 4px;
  padding: 1rem 2rem;
  width: 150px;
}
</style>

