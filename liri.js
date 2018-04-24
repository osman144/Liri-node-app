require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let action = process.argv[2];
let userInput = process.argv[3];


let input = "";

//`my-tweets` Returns tweets from any twitter username 
 
function getTweets() {
  let returnedTweets;
  let params = {screen_name: userInput};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log("Error");
    }
  returnedTweets = 0;
  for (let i=0; i <tweets.length; i++){
    returnedTweets++;
  }

  //Use this if statement to limit to number we want
  if(returnedTweets>25){
    returnedTweets = 25;
  }

  //This will give us some structure, formatting
  for(let i = 0; i<returnedTweets;i++){
    console.log('Tweet '+ (i+1) + ' created on: ' + tweets[i].created_at);
    console.log('Tweet ' + (i+1) +' text: ' + tweets[i].text)
  }
  });
}

getTweets();

//`spotify-this-song`

if(action = 'spotify-this-song, ' && userInput != null){
  input = userInput;
} else{
  input = 'The Sign';
}

function music(input){
  spotify.search({ type: 'track', query: input, limit:20 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  //Filter the returned data based on the provided user input
  const filteredMusic = data.tracks.items.filter((elem) =>{ 
    if (elem.name === input){
      return elem
    }
  });

  //Map the response, create new array from results of filter

  const mappedMusic = filteredMusic.map((elem) => {

    //Name of artist 
    const artist = elem.artists.map(elem => {
      return elem.name;
    })

    //Name of song

    const song = elem.name;

    //Url

    const urlSong = elem.external_urls.spotify;

    //Album name 
    const album = elem.album.name;

    //Give result
    console.log(`\nSong Name: ${song} \nArtist Name: ${artist} \nLink: ${urlSong} \nAlbum: ${album}`)
  });


  });

}

music(input)



//`movie-this`

function movie(){
  action = 'movie-this'
  if(userInput != null){
    input = userInput;
  } else{
    input = 'Mr. Nobody';
  }
  var query = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  request(query, function (error, response, body) {

    if (error){
      console.log('error:', error); // Print the error if one occurred
    }else if(!error && response.statusCode == 200){
    let responseMovie = JSON.parse(body)
    console.log( 
      `\nMovie Title: ${responseMovie.Title}
      \nYear: ${responseMovie.Year}
      \nIMDB Rating: ${responseMovie.imdbRating}
      \nRotten Tomatoes Rating: ${responseMovie.Ratings[1].Value}
      \nCountry of Production: ${responseMovie.Country}
      \nMovie Language: ${responseMovie.Language}
      \Plot: ${responseMovie.Plot}
      \nActors: ${responseMovie.Actors}`
      )
    }
  });

}

movie()

//`do-what-it-says`


