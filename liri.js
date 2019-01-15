// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require('axios');
// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify(keys.spotify);
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });


// Bands in Town API
// app_id=codingbootcamp

var artistName = process.argv.slice(2).join(" ");
var movieName = "mulan"
var bitURL = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=codingbootcamp";
var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// call axios
axios
  .get(bitURL) 
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
