<script setup>

import { onMounted, ref } from 'vue'

defineProps({
  pokename: {
    // type: String,
    type: Object,
    required: true
  }
})

const emit = defineEmits(['selection'])

const selectCard = (n) => {
  isSelected.value = !isSelected.value
  console.log(isSelected.value)
  emit('selection', n)
}

const styleCard = () => {

}

const isSelected = ref(false);

</script>


<template>
  <div class="pokecard" :class="{ selectedCard : isSelected}">
    <h2>Poke Card</h2>
    <!-- <p>{{ pokename }}</p> -->
    <p>{{ pokename.name }}</p>
    <!-- <button @click="$emit('selection', pokename.name)">Select</button> -->
    <button @click="selectCard(pokename.name)">Select</button>
    <router-link class="link" 
                  :to="{
                    name: 'singleview',
                    params: {
                      id: pokename.name
                    }
                  }">
      Read more...
    </router-link>
  </div>
</template>


<style scoped>

.pokecard{
  --green: hsla(160, 100%, 37%, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--green);
  border: 2px solid var(--green);
  border-radius: 4px;
  padding: 1rem;
  width: 150px;
  color: #000;
}

.pokecard a {
  display: flex;
  padding: .5rem 1rem;
  border-radius: 4px;
  background-color: #111;
  color: var(--green);
  cursor: pointer;
}

.pokecard.selectedCard {
  border-color: yellow;
  box-shadow: 0 0 10px 5px var(--green);
}

</style>