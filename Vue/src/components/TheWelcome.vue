<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    AnimesRandom 
    <a href="https://github.com/JordiSLL/AnimePracticaFinal" target="_blank" rel="noopener">official Github</a>
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Functionalities</template>

    Descubre nuevos animes en base al type, score, rating, status o genres.<br />
    Adivina el Op/Ed de animes aleatorios.<br />
    Esta a aplicacion utiliza llamadas a dos Apis: 
    <a href="https://jikan.moe/" target="_blank" rel="noopener"> Jikan.moe</a>,
    <a href="https://animethemes.moe/" target="_blank" rel="noopener"> animethemes.moe</a>
    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Build With</template>

    Este proyecto se ha construido con: 
    <a href="https://vuejs.org/" target="_blank" rel="noopener"> VueJS</a>,
    <a href="https://nodejs.org/" target="_blank" rel="noopener"> Node JS</a>
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>GlobalChat</template>

      Interactua con otros usarios en el chat global. Muy Pronto Nuevas funcionalidades...
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>
    Hecho por Jordi Sánchez y Marc Galobart.
  </WelcomeItem>
</template>
