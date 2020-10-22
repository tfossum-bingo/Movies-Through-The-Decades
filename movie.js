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

    detailsTag(document, target_div) {
  
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
        console.log('Calling for details', this.movieDetails)
        if(this.movieDetails === ''){
            this.detailsTag(document, new_div)
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

    addDetailsLink(document, target_div) {
        
        const detailsLink = document.createElement('span')
        detailsLink.classList.add('more-link')
        // const linkText = document.createTextNode("<More>");
        detailsLink.innerText = '<more>'
        detailsLink.addEventListener('click', function(event){
            event.stopPropagation()
            const panel_movie = new PrimaryMovie(event.target.parentNode.id)
            panel_movie.createPanelDetails(document, event.target.parentNode.id)
            document.querySelector('.sidepanel').style.width = "60%"
            console.log('More button clicked')
        })
        
        target_div.appendChild(detailsLink)
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

    detailsTag = async (document, target_div) => {
        console.log('Details called')
        try{
            const response = await axios.get(`${DETAIL_SEARCH_URL}${this.imdbID}`)
            this.verbose_description = response.data
            console.log('details', response.data)
            const new_p = document.createElement('p')
            new_p.innerText = `${response.data['Plot']} Rated: ${response.data['Rated']} Runtime: ${response.data['Runtime']}`
            this.assignDetailsClassList(new_p)
            target_div.appendChild(new_p)
            this.addDetailsLink(document, target_div)
        }catch(error){
            console.log(error)
        }

    }

    createPanelDetails= async (document, imdbID) => {
        this.resetSidePanel(document)
        const target_div = document.querySelector('.sidepanel')
        try{
            console.log('Passed imdbID: ', imdbID)
            const response = await axios.get(`${DETAIL_SEARCH_URL}${imdbID}`)
            // this.verbose_description = response.data
            console.log('details', response.data)
            target_div.appendChild(this.createPanelHero(document, response.data))
            target_div.appendChild(this.createPanelActors(document, response.data))
            target_div.appendChild(this.createPanelPlot(document, response.data))
            // new_p.innerText = `${response.data['Plot']} Rated: ${response.data['Rated']} Runtime: ${response.data['Runtime']}`
            // this.assignDetailsClassList(new_p)
            // target_div.appendChild(new_p)
            // this.addDetailsLink(document, target_div)
        }catch(error){
            console.log(error)
        }
    }

    createPanelActors(document, data){
        const hero_div = document.createElement('div')
        hero_div.id = 'sidepanel-actors'
        const actors_text = document.createElement('p')
        actors_text.innerText = data['Actors']
        hero_div.appendChild(actors_text)
        return hero_div
    }

    createPanelDetailsList(document, data) {

    }
        
    createPanelHero(document, data) {
        const hero_div = document.createElement('div')
        hero_div.id = 'sidepanel-hero'
        const new_img = document.createElement('img')
        new_img.src = data['Poster']
        new_img.img_alt = `Movie Poster ${data['Title']}`
        hero_div.appendChild(new_img)
        return hero_div
    }

    createPanelPlot(document, data) {
        const plot_div = document.createElement('div')
        plot_div.id = 'sidepanel-plot'
        const article = document.createElement('article')
        plot_div.appendChild(article)
        article.innerText = data['Plot']
        return plot_div
    }

    resetSidePanel(document) {
        document.getElementById('sidepanel-hero').remove()
        document.getElementById('sidepanel-details-list').remove()
        document.getElementById('sidepanel-actors').remove()
        document.getElementById('sidepanel-plot').remove()
    }


}
