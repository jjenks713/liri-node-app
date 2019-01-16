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

var action = process.argv[2];
var value = process.argv[3];
var bitURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp&date=upcoming";
var omdbURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

switch (action) {
    case "concert-this":
        bit();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        ombd();
        break;

    case "do-what-it-says":
        doIt();
        break;
}
function ombd() {
    // call axios
    axios
        .get(omdbURL)
        .then(function (response) {
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1]);
            console.log(response.data.Production);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        })
        .catch(function (error) {
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
};
function bit() {
    axios
        .get(bitURL)
        .then(function (response) {
            console.log(response.data.venue);
            // console.log(response.data.id);
            // console.log(response.data.venue.city);
            // console.log(response.data.datetime);
        })
        .catch(function (error) {
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
};
