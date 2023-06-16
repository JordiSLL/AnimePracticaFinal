
<script>
import randomOpService from '@/services/randomOpService.js';
export default{
mounted(){
  document.querySelector('header img').src= "/img/openingGuess.svg";
},
methods:{
  sendRequest(){
    randomOpService.getRandomOpening().then( data => {
      console.log(data)
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
    <audio controls>
  <source src="" type="audio/mp3">
  Tu navegador no soporta el elemento de audio.
</audio>
<button @click="sendRequest">RandomOpening</button>
<button @click="validation">I got it</button>
<button @click="surrender">Wtf is this opening</button>
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
}
button:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
</style>

