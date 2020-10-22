const searchParams = new URLSearchParams(window.location.search);
const imdbID = searchParams.get('imdbID');
console.log('imdbID: ', imdbID)


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
