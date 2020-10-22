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
        
        const detailsLink = document.createElement('div')
        detailsLink.classList.add('more-link')
        detailsLink.innerText = '<more>'
        detailsLink.addEventListener('click', function(event){
            event.stopPropagation()
            const panel_movie = new PrimaryMovie(event.target.parentNode.id)
            panel_movie.createPanelDetails(document, event.target.parentNode.id)
            document.querySelector('.sidepanel').style.width = "60%"
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

    createPanelDetails = async (document, imdbID) => {
        this.resetSidePanel(document)
        const target_div = document.querySelector('.sidepanel')
        try{
            const response = await axios.get(`${DETAIL_SEARCH_URL}${imdbID}`)
            console.log('details', response.data)
            target_div.appendChild(this.createPanelHero(document, response.data))
            target_div.appendChild(this.createPanelActors(document, response.data))
            target_div.appendChild(this.createPanelPlot(document, response.data))
            target_div.appendChild(this.createPanelDetailsList(document, response.data))
        }catch(error){
            console.log(error)
        }
    }

    createPanelActors(document, data){
        const heroDiv = this.createPanelDiv(document)
        heroDiv.id = 'sidepanel-actors'
        const actorsText = document.createElement('p')
        actorsText.innerText = data['Actors']
        heroDiv.appendChild(actorsText)
        return heroDiv
    }

    createPanelDetailsList(document, data) {
        const detailsDiv = this.createPanelDiv(document)
        detailsDiv.display = 'flex'
        detailsDiv.flexDirection = 'column'
        detailsDiv.justifyContent = 'space-between'
        detailsDiv.id = 'sidepanel-details-list'
        const keys = this.detailKeys()
        const newUL = document.createElement('ul')
        newUL.classList.add = 'sidepanel-unordered-list'
        for(let i = 0; i < keys.length; i++){
            const item = document.createElement('li')
            item.innerHTML = `${keys[i]}: ${data[keys[i]]}`
            item.classList.add('sidepanel-detail-item')
            newUL.appendChild(item)
        }
        detailsDiv.appendChild(newUL)
        return detailsDiv
    }
        
    createPanelHero(document, data) {
        const hero_div = this.createPanelDiv(document)
        hero_div.id = 'sidepanel-hero'
        const new_img = document.createElement('img')
        new_img.src = data['Poster']
        new_img.img_alt = `Movie Poster ${data['Title']}`
        hero_div.appendChild(new_img)
        return hero_div
    }

    createPanelPlot(document, data) {
        const plot_div = this.createPanelDiv(document)
        plot_div.id = 'sidepanel-plot'
        const article = document.createElement('article')
        plot_div.appendChild(article)
        article.innerText = data['Plot']
        return plot_div
    }

    resetSidePanel(document) {
        this.removeElement(document.getElementById('sidepanel-hero'))
        this.removeElement(document.getElementById('sidepanel-details-list'))
        this.removeElement(document.getElementById('sidepanel-actors'))
        this.removeElement(document.getElementById('sidepanel-plot'))
    }

    removeElement(element) {
        if(element != null){
            element.remove()
        }
    }

    createPanelDiv(document){
        const theDiv = document.createElement('div')
        theDiv.classList.add('sp-background')
        return theDiv
    }

    detailKeys() {
        return ['Released','Rated','Runtime', 'Director','Writer', 'Genre', 'Production']
    }


}
