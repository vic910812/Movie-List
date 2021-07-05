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
                      data-target="#movie-modal" data-id="${item.id}">More</button>
                  <button class="btn btn-info btn-add-favorite">+</button>
                </div>
            </div>
        </div>
        </div>`
    })

    dataPanel.innerHTML = rawHTML
}

function showMovieModel(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')

    axios.get(INDEX_URL + id).then(response => {
        const data = response.data.results
        modalTitle.innerText = data.title
        modalDate.innerText = 'Release date:' + data.release_date
        modalDescription.innerText = data.description
        modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="image-fluid">`
    })
}

//匿名函式寫法dataPanel.addEventListener('click', (event) => {
//    console.error('Error')
//    })
//用下方給FUNCTION命名比較好，在DEBUG時會抓得出哪個函式錯誤，反之匿名函式只會說有匿名函式錯誤
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        console.log(event.target.dataset)
        showMovieModel(Number(event.target.dataset.id))
    }
})

axios.get(INDEX_URL).then((response) => {
    //console.log(response.data.results)
    //for (const movie of response.data.results){ 方法1.可以用for迴圈push到movies
    //    movies.push(movie)
    //}
    movies.push(...response.data.results) //方法2.
    console.log(movies)
    renderMovieList(movies)
})