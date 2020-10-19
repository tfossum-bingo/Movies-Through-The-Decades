//Will want to make a parent class from which the primary and candidate movies extend.

class Movie {
    constructor(movie) {
        this.movie = movie
    }

    assignDivClassList(div) {
        div.classList = 'movie'
    }

    posterImageTag(document){
        const new_img = document.createElement('img')
        new_img.src = this.poster_url()
        new_img.img_alt = `Movie Poster ${this.title()}`
        new_img.className = 'candidate-image'
        return new_img
    }

    poster_url(){
        return this.movie['Poster']
    }

    tile(document){
        const new_div = document.createElement('div')
        this.assignDivClassList(new_div)
        new_div.appendChild(this.posterImageTag(document))
        new_div.appendChild(this.titleTag(document))
        new_div.appendChild(this.yearTag(document))
        return new_div
    }

    title(){
        return this.movie['Title']
    }

    titleTag(document) {
        const new_title = document.createElement('p')
        new_title.innerText = this.title()
        return new_title
    }

    year(){
        return this.movie['Year']
    }

    yearTag(document){
        const new_year = document.createElement('p')
        new_year.innerText = this.year()
        return new_year
    }

}

class CandidateMovie extends Movie {
    constructor(movie){
        super(movie)
    }

    assignDivClassList(div) {
        div.className = 'candidate-movie movie'
    }
}

class PrimaryMovie extends Movie {
    constructor(movie){
        super(movie)
    }

    assignDivClassList(div) {
        div.className = 'primary-movie movie'
    }

    titleTag(document) {
        const new_title = document.createElement('h1')
        new_title.innerText = this.title()
        return new_title
    }
}