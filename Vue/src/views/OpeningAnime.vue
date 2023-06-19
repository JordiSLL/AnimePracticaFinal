
<script>
import randomOpService from '@/services/randomOpService.js';
export default{
  data(){
    return {
    animeSong: "",//Nombre real del anime
    info:"",//Correcto o incorrecto
    disabled:"",//true si el resultado es incorrecto
    contador:"",
    animeName:"", //Titulo anime
    disabledCorrect:"",
    animeID:"1",
    animePath:"Random Anime"
    };
  },
mounted(){
  document.querySelector('header img').src= "/img/openingGuess.svg";
},
methods:{
  sendRequest(){
    const inputText = document.getElementById('text');
    inputText.value ="";
    this.animeName="";
    this.animeSong="";
    this.info ="";
    randomOpService.getRandomOpening().then( data => {
      let random = Math.floor(Math.random() * data.data.anime.animethemes.length);
      console.log(data)
      let songLink = data.data.anime.animethemes[random].animethemeentries[0].videos[0].audio.link
      console.log(songLink);
      document.querySelector('audio').src = songLink;
      this.animeSong = data.data.anime.name;
      this.animeID = sessionStorage.getItem("Mal_ID");
      this.animePath = this.animeSong.replace(/ /g, "_");
      console.log(this.animeSong);
    })
  },
  validation(){
    const inputText = document.getElementById('text');
    var text = inputText.value;
    if (text == this.animeSong && text){
      this.disabledCorrect = true;
      this.info = "Correct"
      this.animeName = this.animeSong
      setTimeout(() => {
      this.disabledCorrect = false
      }, 2000)
    }else {
      this.info = "Incorrect"
      this.disabled = true
      setTimeout(() => {
      this.disabled = false
      }, 1500)
      }
  },
  surrender(){
    this.animeName = this.animeSong
    this.disabled = true
    this.info ="";
      setTimeout(() => {
      this.disabled = false
      }, 1500)
  }
}
}
</script>


<template>
  <main>
    <h2 class="introduction">Guess the Random Anime Opening or Ending</h2>
    <router-link class="link" 
                  :to="{
                    name: 'singleview',
                    params: {
                      id: animeID,
                      animeName: animePath
                    }
                  }">
      <h2 class="animeName">{{ animeName }}</h2>
    </router-link>
    <section class="seccionOpening">
    <audio controls>
  <source src="" type="audio/ogg">
  Tu navegador no soporta el elemento de audio.
</audio>
<label class="input-wrapper" data-text="">
  <input id="text" type="text" placeholder="Kimetsu no Ya...">          
</label>
</section>
<section class="seccionButtons">
<button @click="sendRequest" :class="{shake: disabled,wrong:disabled, correct:disabledCorrect }">RandomOpening</button>
<button @click="validation" class="btnValidation" :class="{shake: disabled,wrong:disabled, correct:disabledCorrect }"> I got it</button>
<button @click="surrender" class="btnSurrender" :class="{shake: disabled,wrong:disabled, correct:disabledCorrect }">Wtf is this opening</button>
</section>
<h2 id="info" :class="{shake: disabled,wrong:disabled, correct:disabledCorrect }">{{ info }}</h2>

  </main>
</template>

<style scoped>
#info{
  text-align: center;
}
#info.wrong{
  background-color: red;
}
.wrong{
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}
#info.correct{
  background-color: green;
}
.correct{
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}
.animeName{
  cursor: pointer;
  font-size: xx-large;
  color: white;
  text-align: center;
  margin: 2rem;
}
.introduction{
  font-size: xx-large;
  text-align: center;
  margin: 2rem;
}
audio{
  align-items: center;
}
.seccionOpening{
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-around;
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
  margin: 1rem;
  font-size: 1rem;
}
.btnValidation{
  background: rgb(27, 208, 39);
}
.btnSurrender{
  background: rgb(198, 23, 23);
}
.seccionButtons{
  display: flex;
  justify-content: space-around;
}
button:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
input {
  color: #ddd;
  border: none;
  padding: 0;
  outline: none;
  width: auto;
  min-width: 100%;
  font-size: 1.5rem;
  line-height: 3em;
  font-family: system-ui;
  border-bottom: 3px solid #333333;
  background-color: transparent;
}
.input-wrapper {
  display: block;
  width: 500px;
  position: relative;
}

.input-wrapper::after {
  content: attr(data-text);
  font-size: 1.5rem;
  line-height: 0;
  height: 0;
  max-width: 100%;
  font-family: Roboto, Arial, sans-serif;
  border-bottom: 3px solid #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  overflow: hidden;
  user-select: none;
  color: transparent;
}
</style>

