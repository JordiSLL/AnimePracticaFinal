<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="/img/logo.svg" width="300" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/globalChat">Chat</RouterLink>
        <RouterLink to="/RandomAnime">RandomAnime</RouterLink>
        <RouterLink to="/OpeningAnime">OpeningAnime</RouterLink>
        <RouterLink to="/pokemons">Pokemons</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
a {
    text-decoration: none;
    color: purple;
    transition: 0.4s;
}
a:hover {
    /*color: rgb(68, 29, 177);*/
    background-color:rgb(68, 29, 177) ;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
