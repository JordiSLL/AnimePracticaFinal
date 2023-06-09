
<script setup>

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


import { defineProps, onMounted, ref } from 'vue'
import pokeservice from '@/services/pokeservice.js';

// const props = defineProps(['pokename'])
console.log(props.id)


const loaded = ref('loading...')
const name = ref();
const front = ref();
const back = ref();
const attack = ref();
const defense = ref();

onMounted(() => {

  


  pokeservice.getSinglePokemon(props.id)
              .then( info => info.data )
              .then( poke => {
                console.dir(poke);
                name.value = poke.name
                front.value = poke.sprites.front_default
                back.value = poke.sprites.back_default
                attack.value = poke.stats[1].base_stat
                defense.value = poke.stats[2].base_stat
              })
})



</script>


<template>
  <main>
    <h1>{{ name }}</h1>
    <img :src="front" alt="">
    <img :src="back" alt="">
    <div class="fight">
      <span>Attack: {{ attack }}</span>|
      <span>Defense: {{ defense }}</span>
    </div>
  </main>
</template>

<style scoped>
.cards {
  display: flex;
  justify-items: flex-start;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
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
.fight {
  display: flex;
  gap: 1rem;
}
</style>

