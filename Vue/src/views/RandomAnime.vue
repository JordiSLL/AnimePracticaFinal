
<template>
  <main>
    <h2>{{animeTitle}}</h2>
    <container class="container">
      <section class="infoAnime">
         <img :src="imageSrc" alt="Imagen">
    </section>
    <section class="infoApi">
      <div>
    <label for="type">Type:</label>
    <select v-model="selectedtype" id="type">
      <option value="ALL">Todos</option>
      <option value="tv">TV</option>
      <option value="movie">Pelicula</option>
      <option value="ova">OVA</option>
      <option value="special">Special</option>
      <option value="ona">ONA</option>
    </select>
  </div>

  <div>
    <label for="rating">Rating:</label>
    <select v-model="selectedrating" id="rating">
      <option value="ALL">Todos</option>
      <option value="g">G - All Ages</option>
      <option value="pg">PG - Children</option>
      <option value="pg13">PG-13 - Teens 13 or older</option>
      <option value="r17">R - 17+ (violence & profanity)</option>
      <option value="r">R+ - Mild Nudity</option>
    </select>
  </div>

  <div>
    <label for="max-score">Max Score:</label>
    <input v-model="selectedMax" type="number" id="max-score" min="1" max="10">
  </div>

  <div>
    <label for="min-score">Min Score:</label>
    <input v-model="selectedMin" type="number" id="min-score" min="0" max="10">
  </div>

  <div>
    <label for="status">Status:</label>
    <select v-model="selectedstatus" id="status">
      <option value="ALL">Todos</option>
      <option value="airing">Estrenado</option>
      <option value="complete">Finalizado</option>
      <option value="upcoming">Por Estrenar</option>
    </select>
  </div>

  <div>
    <label for="genres">Genres:</label>
    <select v-model="selectedgenres" id="genres">
      <option value="ALL">Todos</option>
      <option value="1">Action</option>
      <option value="2">Adventure</option>
      <option value="4">Comedy</option>
      <option value="8">Drama</option>
      <option value="10">Fantasy</option>
      <option value="24">Sci-Fi</option>
      <option value="14">Horror</option>
      <option value="62">Isekai</option>
      <option value="7">Mystery</option>
      <option value="22">Romance</option>
      <option value="30">Sports</option>
      <option value="37">Supernatural</option>
      <option value="41">Suspense</option>
    </select>
  </div>
</section>
    </container>
    <button @click="sendRequest">AnimeRandom</button>
  </main>
</template>

<script>
import randomAnimeService from '@/services/randomAnimeService.js';
export default{
  data(){
    return{
      imageSrc: '',
      animeTitle: 'Random Anime'
    }
},
mounted(){
  //document.querySelector('header').style.Height = 500;
  randomAnimeService.getAnimeDefault()
              .then( info => info.data )
              .then( data => {
                console.log(data)
                this.imageSrc = data.data[0].images.jpg.large_image_url;
                this.animeTitle = data.data[0].title;
                console.log(data.data[0].images.jpg.large_image_url)
              }) 

},
methods:{
  sendRequest(){
    randomAnimeService.getAnime(this.selectedtype, this.selectedrating, this.selectedstatus, this.selectedgenres,this.selectedMax,this.selectedMin,0)
              .then( info => info.data )
              .then( data => {
                console.log(data)
                let random = Math.floor(Math.random() * data.pagination.last_visible_page)+1;
                //console.log(data.pagination.last_visible_page)
                //console.log(random)
                randomAnimeService.getAnime(this.selectedtype, this.selectedrating, this.selectedstatus, this.selectedgenres,this.selectedMax,this.selectedMin,random)
                .then( info => info.data )
              .then( data => {
                console.log(data)
                let random = Math.floor(Math.random() * data.pagination.items.total);
                this.imageSrc = data.data[random].images.jpg.large_image_url;
                this.animeTitle = data.data[random].title;
                console.log(data.data[random].images.jpg.large_image_url)})
              }) 
  }
}}

</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  justify-content: center;
    align-items: center;
    margin-top: 2rem;
}
.infoAnime{
  margin-right: 4rem;
}
h2{
  margin-top: 1rem;
  text-align: center;
  font-size: 3rem;
}
button {
  display: block;
  margin: auto;
  width: 15rem;
  height: 3rem;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  background: rgb(68, 29, 177);
  background: linear-gradient(0deg, rgb(68, 29, 177) 0%, rgba(129,5,240,1) 100%);
  border: none;
}
button:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
img {
  width: 200px;
  height: auto;
  display: block;
  margin-bottom: 20px;
}

div {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 100px;
}

select,
input[type="number"] {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #7f8c8d;
  color: var(--color-text);
}
select:hover,
input[type="number"]:hover {
  border: 2px solid rgb(68, 29, 177);
  background: linear-gradient(0deg, rgb(68, 29, 177) 0%, rgba(129,5,240,1) 100%);
  background-color: rgb(68, 29, 177);
}

select {
  height: 30px;
}

input[type="number"] {
  height: 25px;
}

input[type="submit"] {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
.submit-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>

