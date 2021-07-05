const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/poster/'

const movies = []

axios.get(INDEX_URL).then((response) => {
    //console.log(response.data.results)
    //for (const movie of response.data.results){ 方法1.可以用for迴圈push到movies
    //    movies.push(movie)
    //}
    movies.push(...response.data.results) //方法2.
    console.log(movies)
})