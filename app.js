console.log('Connected!')

let myList = {}
let primaryMovie
let candidateMovies
let myDocument = document.querySelector('body')
const searchButton = document.getElementById('search-button')
const titleField = document.getElementById('title-search')

const DOMAIN = 'http://www.omdbapi.com/';
const API_KEY = '3279c95f'
const BASE_URL = `${DOMAIN}?apikey=${API_KEY}&s=`
const DETAIL_SEARCH_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=`

console.log('BASE_URL: ', BASE_URL)

const addCompareChildClickListeners = (candidate_movie_div) => {
    // console.log('candidate_movie_div: ', candidate_movie_div)

    for(let i = 0; i < candidate_movie_div.childNodes.length; i++){
        candidate_movie_div.childNodes[i].addEventListener('click', function(event){
            event.stopPropagation()
            const parent_imdbID = candidate_movie_div.childNodes[i].parentNode.id
            console.log(`Child-${i}:`, parent_imdbID)
            addCompareMovie(parent_imdbID)
        })
    }
}

const addCompareClickListeners = (candidate_movie_div) => {
    candidate_movie_div.addEventListener('click', function(event){
        const parent_imdbID = event.target.id
        addCompareMovie(parent_imdbID)
    })
    addCompareChildClickListeners(candidate_movie_div)
}

const addCompareMovie = (imdbID) => {
    const compare_movie = candidateMovies.find(movie => movie['imdbID'] == imdbID)
    if(compare_movie != null){
        addPrimaryMovieTile(compare_movie)
    }
}

const addCandidateMovies = (older_movies) => {
    const older_movie_div = newDiv()
    older_movie_div.classList = 'candidate-movie-container'
    older_movies.forEach(movie => {
        const current_movie = new CandidateMovie(movie)
        const current_movie_div = current_movie.tile(document)
        addCompareClickListeners(current_movie_div)
        older_movie_div.appendChild(current_movie_div)
    })
    myDocument.appendChild(older_movie_div)
}

const addPrimaryMovieTile = (movie) => {
    if(document.querySelector('.primary-movie-container') !== null){
        removePriorCompare()
    }
    const primary_movie_container = primaryMovieContainer()
    const primary_movie = new PrimaryMovie(movie)
    fetchMovieDetails(primary_movie)
    //Really don't like this and would rather wait specifically for the reply.
    setTimeout(function(){
        console.log('Waited for details')
        console.log('Done waiting')
        const primary_movie_div = primary_movie.tile(document)
        primary_movie_container.appendChild(primary_movie_div)
    }, 250)
    
    return true
}

const fetchMovieDetails = async (movie) => {
    try{
        const response = await axios.get(`${DETAIL_SEARCH_URL}${movie.imdbID}`)
        console.log(response.data)
        movie.verbose_description = response.data
        console.log('verbose: ', movie.verbose_description)
    }catch(error){
        console.log(error)
    }
}

const findOlderMovies = (sorted_movies, years_ago) => {
    const olderMovies = sorted_movies.filter(movie => movie['Year'] < primaryMovie['Year'] - years_ago)
    candidateMovies = sortMovies(olderMovies)

    return candidateMovies
}

const findPrimaryMovie = (sorted_movies) => {
    if(sorted_movies.length > 0){
        primaryMovie = sorted_movies.shift()
    }
}

const newDiv = () => {
    return document.createElement('div')
}

const performSearch = (event) => {
    resetPage()
    event.preventDefault()
    const searchValue = titleField.value
    searchMovies(searchValue)
} 

const primaryMovieContainer = () => {
    const primary_container = document.querySelector('.primary-movie-container')
    if(primary_container === null) {
        const primary_movie_container = newDiv()
        primary_movie_container.classList = 'primary-movie-container'
        myDocument.appendChild(primary_movie_container)
        return primary_movie_container
    } else {
        return primary_container
    }
}

const processList = (movie_list) => {
    const sortedList = sortMovies(movie_list)
    findPrimaryMovie(sortedList)
    addPrimaryMovieTile(primaryMovie)
    addCandidateMovies(findOlderMovies(sortedList, 10))
}

const resetPage = () => {
    const movie_divs = document.getElementsByClassName('movie')
    while(movie_divs.length > 0){
        movie_divs[0].remove()
    }
    return true
}

const removePriorCompare = () => {
    const existing_comparisons = document.querySelector('.primary-movie-container')

    if(existing_comparisons != null && existing_comparisons.childElementCount > 1){
        existing_comparisons.removeChild(existing_comparisons.lastChild)
    }

}

const searchMovies = async (titleSearch) => {
    try{
        const response = await axios.get(`${BASE_URL}${titleSearch}`)
        // console.log(response.data.Search)
        processList(response.data.Search)
        return response.data.Search
    }catch(error){
        console.log(error)
    }
}

const sortMovies = (movie_list) => {
    movie_list.sort(function(a,b){
        return b['Year'] - a['Year']
    })
    // console.log(movie_list)
    return movie_list
}

//Event listeners for static elements

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


