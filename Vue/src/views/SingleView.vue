
<script setup>
import { defineProps, onMounted, ref } from 'vue'
import randomAnimeService from '@/services/randomAnimeService.js';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

console.log(props.id)

const name = ref();
const nameEng = ref();
const animecover = ref();
const status = ref();
const episodes = ref();
const favorites = ref();
const genres = ref();
const mal_URL = ref();
const popularity = ref();
const rank = ref();
const score = ref();
const synopsis = ref();
const year = ref();

onMounted(() => {

  randomAnimeService.getAnimeById(props.id)
              .then( info => info.data )
              .then( anime => {
                console.dir(anime);
                name.value = anime.data.title;
                nameEng.value =  anime.data.title_english; 
                episodes.value = anime.data.episodes;
                genres.value = "";
                for (let i= 0; i < anime.data.genres.length; i++) {
                  genres.value += ' ' + anime.data.genres[i].name;
                }
                animecover.value = anime.data.images.jpg.large_image_url;
                status.value = anime.data.status;
                favorites.value = anime.data.favorites;
                mal_URL.value = anime.data.url;
                popularity.value = anime.data.popularity;
                rank.value = anime.data.rank;
                score.value =  anime.data.score;
                synopsis.value =  anime.data.synopsis;
                year.value = anime.data.year;
              })
})

</script>


<template>
  <main>
    <section class="titles">
      <h1>{{ name }}</h1>
      <h2 v-if="name !== nameEng">{{ nameEng }}</h2>
    </section>
    <container class="container">
      <section class="left">
          <a :href="mal_URL" target="_blank">
            <img :src="animecover" alt="Imagen Anime">
          </a>
          
      </section>
      <section class="right">
        <h2> ID Anime: {{ props.id }}</h2>
        <h2 v-if="status">Estado: {{ status}}</h2>
        <h2 v-if="score">Score: {{ score}}</h2>
        <h2 v-if="year">Año: {{ year}}</h2>
        <h2 v-if="episodes">Episodios: {{ episodes }}</h2>
        <h2 v-if="favorites">Favoritos: {{ favorites}}</h2>
        <h2 v-if="popularity">Popularidad: {{ popularity }}</h2>
        <h2 v-if="rank">Rank: {{ rank }}</h2>
        <h2>Generos:{{ genres }}</h2>
      </section>
</container>
<p>{{ synopsis}}</p>
  </main>
</template>

<style scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}
.titles{
  text-align: center;
  margin:1rem;
}
h1{
  color:white;
  font-size: 2rem;
}
img{
  max-width: 350px;
}
.right>h2{
  margin-top: 1rem;
}
p {
  text-align: justify;
}
</style>

