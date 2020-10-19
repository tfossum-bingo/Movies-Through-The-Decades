console.log('Connected!')

let myList = {}
let primaryMovie

const DOMAIN = 'http://www.omdbapi.com/';
const API_KEY = '3279c95f'
const BASE_URL = `${DOMAIN}?apikey=${API_KEY}&s=`;

console.log('BASE_URL: ', BASE_URL)

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

const processList = (movie_list) => {
    const sortedList = sortMovies(movie_list)
    setPrimaryMovie(sortedList)
}

const setPrimaryMovie = (sorted_movies) => {
    if(sorted_movies.length > 0){
        primaryMovie = sorted_movies[0]
        console.log('Primary Movie: ', primaryMovie)
    }
}

const sortMovies = (movie_list) => {
    movie_list.sort(function(a,b){
        return b['Year'] - a['Year']
    })
    console.log(movie_list)
    return movie_list
}

console.log(getMovies('heat'))
console.log('myList: ', myList)