//Will want to make a parent class from which the primary and candidate movies extend.

class Movie {
    constructor(movie) {
        this.movie = movie
        this.verbose_description = ''
    }

    assignDetailsClassList(new_p) {
    }

    assignDivClassList(div) {
        div.classList = 'movie'
    }

    assignImageClassList(img) {
        img.classList = 'candidate-image'
    }

    assignSmallerTitle(p) {
        if(this.title.length > 30){
            p.classList.add('small-title')
        }
    }

    assignTitleClassList(p) {
        this.assignSmallerTitle(p)
    }

    assignYearClassList(p) {
        p.classList = 'movie-year'
    }

    detailsTag(document) {
        const new_p = document.createElement('p')
        console.log('details', this.verbose_description)
        new_p.innerText = `${this.movieDetails['Plot']} Rated: ${this.movieDetails['Rated']} Runtime: ${this.movieDetails['Runtime']}`
        this.assignDetailsClassList(new_p)
        return new_p
    }
 
    get imdbID(){
        return this.movie['imdbID']
    }

    set movieDetails(movie_details) {
        this.verbose_description = movie_details
    }

    get movieDetails() {
        return this.verbose_description
    }

    posterImageTag(document){
        const new_img = document.createElement('img')
        new_img.src = this.poster_url
        new_img.img_alt = `Movie Poster ${this.title}`
        this.assignImageClassList(new_img)
        return new_img
    }

    get poster_url(){
        return this.movie['Poster']
    }

    tile(document){
        const new_div = document.createElement('div')
        new_div.id = this.movie['imdbID']
        this.assignDivClassList(new_div)
        new_div.appendChild(this.posterImageTag(document))
        new_div.appendChild(this.titleTag(document))
        new_div.appendChild(this.yearTag(document))
        if(this.movieDetails != ''){
            new_div.appendChild(this.detailsTag(document))
        }
        return new_div
    }

    get title(){
        return this.movie['Title']
    }

    titleTag(document) {
        const new_title = document.createElement('p')
        new_title.innerText = this.title
        this.assignTitleClassList(new_title)
        return new_title
    }

    get year(){
        return this.movie['Year']
    }

    yearTag(document){
        const new_year = document.createElement('p')
        this.assignYearClassList(new_year)
        new_year.innerText = this.year
        return new_year
    }


}

class CandidateMovie extends Movie {
    constructor(movie){
        super(movie)
    }

    assignDivClassList(div) {
        super.assignDivClassList(div)
        div.classList.add('candidate-movie')
    }

    assignTitleClassList(p) {
        p.classList.add('candidate-movie-title')
        super.assignTitleClassList(p)
    }
}

class PrimaryMovie extends Movie {
    constructor(movie){
        super(movie)
    }

    assignDetailsClassList(new_p) {
        new_p.classList = 'primary-description'
    }

    assignDivClassList(div) {
        super.assignDivClassList(div)
        div.classList.add('primary-movie')
    }

    assignImageClassList(img) {
        img.classList = 'primary-image'
    }
    
    assignTitleClassList(p) {
        p.classList.add('primary-movie-title')
        super.assignTitleClassList(p)
    }

}