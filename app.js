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
        // console.log('movie_id', event.target.id)
        addCompareMovie(parent_imdbID)
    })
    addCompareChildClickListeners(candidate_movie_div)
}

const addCompareMovie = (imdbID) => {
    const compare_movie = candidateMovies.find(movie => movie['imdbID'] == imdbID)
    // console.log('Found Movie', compare_movie)
    if(compare_movie != null){
        addPrimaryMovieTile(compare_movie)
    }
}

const addCandidateMovies = (older_movies) => {
    const older_movie_div = newDiv()
    older_movie_div.classList = 'candidate-movie-container'
    older_movies.forEach(movie => {
        // console.log('Current Movie: ', movie['Title'])
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
    const primary_movie_div = new PrimaryMovie(movie).tile(document)
    const primary_movie_container = primaryMovieContainer()
    primary_movie_container.appendChild(primary_movie_div)

    return true
}

const findOlderMovies = (sorted_movies, years_ago) => {
    const olderMovies = sorted_movies.filter(movie => movie['Year'] < primaryMovie['Year'] - years_ago)
    console.log('Older Movies', olderMovies)
    candidateMovies = sortMovies(olderMovies)

    return candidateMovies
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
    searchMovies(searchValue)
} 

const primaryMovieContainer = () => {
    const primary_container = document.querySelector('.primary-movie-container')
    console.log('Primary Container: ', primary_container)
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
    if(existing_comparisons != null){
        console.log('Existing Compare Length: ', existing_comparisons.childElementCount)
    }

    if(existing_comparisons != null && existing_comparisons.childElementCount > 1){
        console.log('Last Child: ', existing_comparisons.lastChild)
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
    console.log(movie_list)
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


