var APIkey = '2129d479a91cfa69f8540fc782cf615a';
var card1Row1 = document.getElementById('card-1')
var card2Row2 = document.getElementById('card-2')
var card3Row3 = document.getElementById('card-3')
var card4Row4 = document.getElementById('card-4')
var card5Row5 = document.getElementById('card-5')

// Defines getMovies function
function getMovies() {
  // Gets data for movies now playing and sorts by popularity descending
  fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=2129d479a91cfa69f8540fc782cf615a")
  // Parses response
  .then(function (response) {
    return response.json();
  })
  // Logs array of movies to the console
  .then(function (data) {
    console.log(data.results);
    // Sets cards to display the posters of the movies from the results
    for (i = 0; i < movieCards1El.children.length; i++) {
      movieCards1El.children[i].children[0].setAttribute("style", "background-image: url('https://image.tmdb.org/t/p/w500" + data.results[i].poster_path + "');");
    }
    for (i = 0; i < movieCards2El.children.length; i++) {
      movieCards2El.children[i].children[0].setAttribute("style", "background-image: url('https://image.tmdb.org/t/p/w500" + data.results[i + 5].poster_path + "');");
    }
  });
}

/* ​
Genre ID list:
  
Action - id: 28
Adventure - id: 12
Animation - id: 16
Comedy - id: 35
Crime - id: 80
Documentary - id: 99
Drama - id: 18
Family - id: 10751
Fantasy - id: 14
History - id: 36
Horror - id: 27
Music - id: 10402
Mystery - id: 9648
Romance - id: 10749
Science Fiction - id: 878
TV Movie -​​ id: 10770
Thriller - id: 53
War - id: 10752
Western - id: 37
*/
  
// Defines variables for following functions
var filteredResults = [];
var page = 1;
var pagesTotal = 50;
var genreSelection = 10751



// Defines clearFilter function. For when running the filter functions multiple times
function clearFilter() {
  // Clears filteredResults array
  filteredResults = [];
  // Clears poster images from cards
  for (i = 0; i < movieCards2El.children.length; i++) {
    movieCards2El.children[i].children[0].setAttribute("style", "background-image: none;");
  }
  // Sets page back to 1
  page = 1;
  getPage();
}

// Defines getPage function and makes it asynchronous
async function getPage() {
  // Gets a page of movie data sorted by popularity descending
  var response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=2129d479a91cfa69f8540fc782cf615a&page=${page}`);
  // Parses response into objects and arrays
  var movies = await response.json();
  // Parsed data is passed as the argument in the filterResults function
  filterResults(movies);
  // The getPage function runs again on the next page results until page 50
  if (page < pagesTotal) {
    page++;
    getPage();
  }
}
  
// Defines filterResults function
function filterResults(data) {
  // Pushes movies matching the selected genre to the filteredResults array
  for (i = 0; i < 19; i++) {
    if (data.results[i].genre_ids.includes(genreSelection)) {
      filteredResults.push(data.results[i]);
    }
  }
  // Logs filteredResults array to the console
  console.log(filteredResults);
  if (filteredResults.length >= 5) {
    // Sets second row of cards to display the posters of movies from the filtered results
    for (i = 0; i < movieCards2El.children.length; i++) {
      movieCards2El.children[i].children[0].setAttribute("style", "background-image: url('https://image.tmdb.org/t/p/w500" + filteredResults[i].poster_path + "');");
    }
  }
  else if (page >= pagesTotal) {
    // Sets second row of cards to display the posters of movies from the filtered results
    for (i = 0; i < movieCards2El.children.length; i++) {
      movieCards2El.children[i].children[0].setAttribute("style", "background-image: url('https://image.tmdb.org/t/p/w500" + filteredResults[i].poster_path + "');");
    }
  }
}
  
// Runs getMovies on page load
getMovies();



// Function to fetch top rated movies from TMDb api, then display dynamically to the page
function fetchTopRated () {
  var topRatedURl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + APIkey + '&language=en-US&page=1'

  // Fetches URL 
  fetch(topRatedURl)
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    var posterLink = 'https://image.tmdb.org/t/p/original/'
    var poster1 = posterLink + data.results[0].poster_path
    var poster2 = posterLink + data.results[1].poster_path
    var poster3 = posterLink + data.results[2].poster_path
    var poster4 = posterLink + data.results[3].poster_path
    var poster5 = posterLink + data.results[4].poster_path
    var card1Row1Content = ""
    var card2Row2Content = ""
    var card3Row3Content = ""
    var card4Row4Content = ""
    var card5Row5Content = ""

    card1Row1Content += `<div class="img-fit card" style="background-image:url('${poster1}')"></div>`
    card2Row2Content += `<div class="img-fit card" style="background-image:url('${poster2}')"></div>`
    card3Row3Content += `<div class="img-fit card" style="background-image:url('${poster3}')"></div>`
    card4Row4Content += `<div class="img-fit card" style="background-image:url('${poster4}')"></div>`
    card5Row5Content += `<div class="img-fit card" style="background-image:url('${poster5}')"></div>`

    
    card1Row1.innerHTML = card1Row1Content
    card2Row2.innerHTML = card2Row2Content
    card3Row3.innerHTML = card3Row3Content
    card4Row4.innerHTML = card4Row4Content
    card5Row5.innerHTML = card5Row5Content
  })
}





fetchTopRated()