import axios from 'axios'
import randomAnimeService from '@/services/randomAnimeService.js';

const openingRandom = axios.create({
    baseURL: 'https://api.animethemes.moe/anime',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json'
    }
  })
  function convertToSlug(text) {
    return text
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with hyphens
      .replace(/-/g, '_') // Replace hyphens with underscores
      .trim(); // Remove leading/trailing whitespace
  }
  export default {
    getRandomOpening() {
        var nameAnime ="";       
      return randomAnimeService.getTopAnime().then( info => info.data )
      .then( data => {
        console.log(data)
        let random = Math.floor(Math.random() * 25);
        nameAnime = data.data[random].title;
        nameAnime = convertToSlug(nameAnime);
        console.log(nameAnime);
        return openingRandom.get(`/${nameAnime}?include=animethemes.animethemeentries.videos.audio`)
      })
    }}