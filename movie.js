const axios = require('axios')

class Movie{
    constructor(adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count){
      this.adult = adult    
      this.backdrop_path = backdrop_path
      this.genre_ids = genre_ids
      this.id = id
      this.original_language = original_language
      this.original_title = original_title
      this.overview = overview
      this.popularity = popularity
      this.poster_path = poster_path
      this.release_date = release_date
      this.title = title
      this.video = video
  this.vote_average = vote_average
  this.vote_count = vote_count    
    }}

async function getMovie(movie){
    let movieSelected = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`)
    if(movieSelected.data.results.length === 0){
      return("Try again nigga")
    }else{
     return(movieSelected.data.results)
   }
}

module.exports = getMovie

  