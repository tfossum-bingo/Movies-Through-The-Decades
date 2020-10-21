# Movies-Through-The-Decades

## Overview 
After searching for a movie based on partial title, the site will return a collection of movies with a similar title released 10 years prior.

## API
This project utilizes the OMDb API:
http://www.omdbapi.com/

Request
```
http://www.omdbapi.com/?apikey=3279c95f&s=heat
```

Response
```
{
Search: [
{
Title: "Heat",
Year: "1995",
imdbID: "tt0113277",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BNGMwNzUwNjYtZWM5NS00YzMyLWI4NjAtNjM0ZDBiMzE1YWExXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
},
{
Title: "The Heat",
Year: "2013",
imdbID: "tt2404463",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BMjA2MDQ2ODM3MV5BMl5BanBnXkFtZTcwNDUzMTQ3OQ@@._V1_SX300.jpg"
},
{
Title: "In the Heat of the Night",
Year: "1967",
imdbID: "tt0061811",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BZjZhZTZkNWItZGE1My00MTRkLWI2ZDktMWZkZTIxZWYxOTgzXkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_SX300.jpg"
},
{
Title: "Red Heat",
Year: "1988",
imdbID: "tt0095963",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BMDkwMTJlMGMtMGJmMy00Mjg2LWEwOWEtZTAxNzQxMmVjYzVkXkEyXkFqcGdeQXVyNjc2NDI1ODA@._V1_SX300.jpg"
},
{
Title: "Body Heat",
Year: "1981",
imdbID: "tt0082089",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BZWJhOTIwMjEtY2NkOC00ZDUyLTg0ZDgtZTM5OTI3YjViYTNmXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"
},
{
Title: "White Heat",
Year: "1949",
imdbID: "tt0042041",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BZmI5NTA3MjItYzdhMi00MWMxLTg3OWMtYWQyYjg5MTFmM2U0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
},
{
Title: "The Big Heat",
Year: "1953",
imdbID: "tt0045555",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BMmY1YzRmZDgtMTU4NS00NTcwLWE3N2EtNDc0MTk1ODg2YTA2XkEyXkFqcGdeQXVyMTYzMTY1MjQ@._V1_SX300.jpg"
},
{
Title: "City Heat",
Year: "1984",
imdbID: "tt0087062",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BMWM0Y2JhMGItMjc1NC00MjAwLWFmY2QtY2YzZjA3N2ZhYjlmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
},
{
Title: "Dead Heat",
Year: "1988",
imdbID: "tt0094961",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BNzQ5YzVlMTQtMGM3OS00NjI2LTkzOGEtNjkwMGRlNGE1MDRhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
},
{
Title: "Java Heat",
Year: "2013",
imdbID: "tt2083231",
Type: "movie",
Poster: "https://m.media-amazon.com/images/M/MV5BMTczNzU3MTA3Nl5BMl5BanBnXkFtZTcwOTc1OTYzOQ@@._V1_SX300.jpg"
}
],
totalResults: "403",
Response: "True"
}
```

This project might also utilize the following API for book data:
https://www.goodreads.com/api

## Use Cases:
Following is a notional list of use cases. While not granularly decomposed, they provide an overview of the funcitonality and some suggestion of the iterative delivery.
* As site user I want to be able to see information about the site so I know how to use it.
* As a site user I want to be able to submit a search so it knows what title interests me.
* As a site user I want to be able to see what movie matched my search so I know what the other movies are referenced against.
* As a site user I want to see a list of matching titles from 10 years prior to the first match so I can peruse some fun oldies.
* As a site user I want to be able to clear the search results so I can search again.
* Stretch Goals:
    * As a site user I want to be able to select movie and compare it's information against the primary hit so I can see how they're different.
    * As a site user I want to be able to drag-and-drop the movie I want to compare against the primary hit, because that makes it easy for me.
    * As a site user I want to be able to optionally check if there's a book of the same title as one of the search results, because reading is fundamental.

## Project Oversight
This project is being managed via a Trello board
https://trello.com/b/71URbltV/movies-through-the-decades

## Low Fidelity Wireframe
https://ted-fossum-personal.s3.amazonaws.com/general-assembly/mttd_wireframe.png
