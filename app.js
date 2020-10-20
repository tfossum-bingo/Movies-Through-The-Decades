console.log('Connected!')

let myList = {}
let primaryMovie
let candidateMovies
let myDocument = document.querySelector('body')
const searchButton = document.getElementById('search-button')
const titleField = document.getElementById('title-search')

const DOMAIN = 'http://www.omdbapi.com/';
const API_KEY = '3279c95f'
const BASE_URL = `${DOMAIN}?apikey=${API_KEY}&s=`;
console.log('BASE_URL: ', BASE_URL)


const addOlderMovies = (older_movies) => {
    const older_movie_div = newDiv()
    older_movie_div.classList = 'candidate-movie-container'
    older_movies.forEach(movie => {
        console.log('Current Movie: ', movie['Title'])
        const current_movie = new CandidateMovie(movie)
        older_movie_div.appendChild(current_movie.tile(document))
    })
    myDocument.appendChild(older_movie_div)
}

const addPrimaryMovieTile = (movie) => {
    const primary_movie_container = newDiv()
    primary_movie_container.classList = 'primary-movie-container'
    const primary_movie_div = new PrimaryMovie(movie).tile(document)
    primary_movie_container.appendChild(primary_movie_div)
    myDocument.appendChild(primary_movie_container)

    return true
}

const getMovies = async (titleSearch) => {
    try{
        const response = await axios.get(`${BASE_URL}${titleSearch}`)
        // console.log(response.data.Search)
        processList(response.data.Search)
        return response.data.Search
    }catch(error){
        console.log(error)
    }
}

const findOlderMovies = (sorted_movies, years_ago) => {
    const olderMovies = sorted_movies.filter(movie => movie['Year'] < primaryMovie['Year'] - years_ago)
    console.log('Older Movies', olderMovies)
    return olderMovies
}

const findPrimaryMovie = (sorted_movies) => {
    if(sorted_movies.length > 0){
        primaryMovie = sorted_movies.shift()
        console.log('Primary Movie: ', primaryMovie)
    }
}

const newDiv = () => {
    return document.createElement('div')
}

const performSearch = (event) => {
    resetPage()
    event.preventDefault()
    const searchValue = titleField.value
    getMovies(searchValue)
} 

const processList = (movie_list) => {
    const sortedList = sortMovies(movie_list)
    findPrimaryMovie(sortedList)
    addPrimaryMovieTile(primaryMovie)
    addOlderMovies(sortMovies(findOlderMovies(sortedList, 10)))
}

const resetPage = () => {
    const movie_divs = document.getElementsByClassName('movie')
    while(movie_divs.length > 0){
        movie_divs[0].remove()
    }
    return true
}

const sortMovies = (movie_list) => {
    movie_list.sort(function(a,b){
        return b['Year'] - a['Year']
    })
    console.log(movie_list)
    return movie_list
}

searchButton.addEventListener('click', function(event){
    performSearch(event)
})

titleField.addEventListener('click', function(event){
    resetPage()
    titleField.value = null
})

titleField.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        event.preventDefault()
        searchButton.click()
    }
})


