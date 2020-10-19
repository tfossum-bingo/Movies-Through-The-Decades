console.log('Connected!')

let myList = {}
let primaryMovie
let candidateMovies
let myDocument = document.querySelector('body')

const DOMAIN = 'http://www.omdbapi.com/';
const API_KEY = '3279c95f'
const BASE_URL = `${DOMAIN}?apikey=${API_KEY}&s=`;
console.log('BASE_URL: ', BASE_URL)


const createPrimaryMovieTile = (movie) => {
    const new_div = newDiv()
    new_div.className = 'primary_movie'
    new_div.appendChild(createH2Title(movie))
    new_div.appendChild(createULDetails(movie))
    console.log(new_div)
    return new_div
}

const createH2Title = (movie) => {
    const new_h2 = document.createElement('h2')
    new_h2.innerText = movie['Title']
    console.log('H2 Title: ', new_h2)
    return new_h2
}

const createULDetails = (movie) => {
    const new_ul = document.createElement('ul')
    const desired_keys = ['Year']
    desired_keys.forEach(element => {
        const new_li = document.createElement('li')
        console.log('Current Key: ', element, movie[element])
        new_li.innerHTML = movie[element]
        console.log('li: ', new_li)
        new_ul.appendChild(new_li)
    })
    console.log('New_UL: ', new_ul)
    return new_ul
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

const processList = (movie_list) => {
    const sortedList = sortMovies(movie_list)
    findPrimaryMovie(sortedList)
    findOlderMovies(sortedList, 10)
    myDocument.appendChild(createPrimaryMovieTile(primaryMovie))
}

const sortMovies = (movie_list) => {
    movie_list.sort(function(a,b){
        return b['Year'] - a['Year']
    })
    console.log(movie_list)
    return movie_list
}

console.log(getMovies('fast'))
console.log('myList: ', myList)

