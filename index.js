const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const MOVIES_PER_PAGE = 12

const movies = []
let filteredMovies = []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')

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
                  <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
                </div>
            </div>
        </div>
        </div>`
    })

    dataPanel.innerHTML = rawHTML
}

function renderPaginator(amount) {
    const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)

    let rawHTML = ''

    for (let page = 1; page <= numberOfPages; page++) {
        rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
    }

    paginator.innerHTML = rawHTML
}

function getMoviesByPage(page) {
    const data = filteredMovies.length ? filteredMovies : movies
    const startIndex = (page - 1) * MOVIES_PER_PAGE
    return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
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

function addToFavorite(id) {
    function isMovieIdMatched(movie) {
        return movie.id === id
    }
    console.log(id)
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = movies.find(isMovieIdMatched)

    if (list.some(isMovieIdMatched)) {
        return alert('此電影已經在收藏清單中!')
    }

    list.push(movie)
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
}
//匿名函式寫法dataPanel.addEventListener('click', (event) => {
//    console.error('Error')
//    })
//用下方給FUNCTION命名比較好，在DEBUG時會抓得出哪個函式錯誤，反之匿名函式只會說有匿名函式錯誤
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        console.log(event.target.dataset)
        showMovieModel(Number(event.target.dataset.id))
    } else if (event.target.matches('.btn-add-favorite')) {
        addToFavorite(Number(event.target.dataset.id))
    }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
    if (event.target.tagName !== 'A') return
    const page = Number(event.target.dataset.page)
    renderMovieList(getMoviesByPage(page))
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
    event.preventDefault()
    console.log(event)
    const keyword = searchInput.value.trim().toLowerCase()
    //if(!keyword.length) {
    //    return alert ('Please enter a valid string')
    //}
    //filteredMovies = movies.filter((movie) =>      比較高級的寫法
    //  movie.title.toLowerCase().includes(keyword)
    //)
    for (const movie of movies) {
        if (movie.title.toLowerCase().includes(keyword)) {
            filteredMovies.push(movie)
            if (filteredMovies.length === 0) {
                return alert('Cannot find movies with keyword:' + keyword)
            }
        }
    }
    renderPaginator(filteredMovies.length)
    renderMovieList(getMoviesByPage(1))
})

axios.get(INDEX_URL).then((response) => {
    //console.log(response.data.results)
    //for (const movie of response.data.results){ 方法1.可以用for迴圈push到movies
    //    movies.push(movie)
    //}
    movies.push(...response.data.results) //方法2.
    console.log(movies)
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(1))
})