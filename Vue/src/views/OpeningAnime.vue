
<script>
import randomOpService from '@/services/randomOpService.js';
export default{
mounted(){
  document.querySelector('header img').src= "/img/openingGuess.svg";
},
methods:{
  sendRequest(){
    randomOpService.getRandomOpening().then( data => {
      let random = Math.floor(Math.random() * data.data.anime.animethemes.length);
      console.log(data)
      let songLink = data.data.anime.animethemes[random].animethemeentries[0].videos[0].audio.link
      console.log(songLink);
      document.querySelector('audio').src = songLink;
    })
  },
  validation(){

  },
  surrender(){

  }
}
}
</script>


<template>
  <main>
    <h1>Guess the Random Anime</h1>
    <h2 class="animeName">AnimeName:</h2>
    <audio controls>
  <source src="" type="audio/ogg">
  Tu navegador no soporta el elemento de audio.
</audio>
<input class="text" type="text">
<button @click="sendRequest">RandomOpening</button>
<button @click="validation" class="btnValidation">I got it</button>
<button @click="surrender" class="btnSurrender">Wtf is this opening</button>
  </main>
</template>

<style scoped>
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
  margin: 1rem;
}
.btnValidation{
  background: rgb(27, 208, 39);
}
.btnSurrender{
  background: rgb(198, 23, 23);
}

button:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
</style>

