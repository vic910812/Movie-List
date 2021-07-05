const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = []

const dataPanel = document.querySelector('#data-panel')

function renderMovieList(data) {
    let rawHTML = ''

    data.forEach((item) => {
        console.log(item)
        rawHTML +=
        `<div class="col-sm-3">
        <div class="mb-2">
            <div class="card">
                <img class="card-img-top"
                  src="${POSTER_URL + item.image}"
                  alt="Movie Poster">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                </div>
                <div class="card-footer">
                  <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                      data-target="#movie-modal">More</button>
                  <button class="btn btn-info btn-add-favorite">+</button>
                </div>
            </div>
        </div>
        </div>`
    })

    dataPanel.innerHTML = rawHTML
}

axios.get(INDEX_URL).then((response) => {
    //console.log(response.data.results)
    //for (const movie of response.data.results){ 方法1.可以用for迴圈push到movies
    //    movies.push(movie)
    //}
    movies.push(...response.data.results) //方法2.
    console.log(movies)
    renderMovieList(movies)
})