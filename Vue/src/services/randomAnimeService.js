import axios from 'axios'
const animeRandom = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json'
    }
  })

  export default {
    getAnimeDefault() {
      return animeRandom.get('/anime?sfw',{
      params: {
        min_score: 7,
        max_score: 10,
        genres: 10,
        type: 'TV',
        status: 'airing', 
        limit: 1
    }})
    },
    getAnime(selectedtype, selectedrating, selectedstatus, selectedgenres, selectedMax, selectedMin,randomPage) {
      console.log(selectedtype, selectedrating, selectedstatus, selectedgenres, selectedMax, selectedMin);
    
      const params = {};
    
      if (selectedMin !== null && selectedMin < selectedMax) {
        params.min_score = selectedMin;
      }
      if (selectedMax !== null && selectedMin < selectedMax) {
        params.max_score = selectedMax;
      }
      if (selectedgenres !== null && selectedgenres !== 'ALL') {
        params.genres = selectedgenres;
      }
      if (selectedtype !== null && selectedtype !== 'ALL') {
        params.type = selectedtype;
      }
      if (selectedstatus !== null && selectedstatus !== 'ALL') {
        params.status = selectedstatus;
      }
      if (selectedrating !== null && selectedrating !== 'ALL') {
        params.rating = selectedrating;
      }
      if (randomPage !== null && randomPage > 0) {
        params.page = randomPage;
      }
      //console.log('/anime', { params });
      return animeRandom.get('/anime?sfw', { params });
    }
  }
    