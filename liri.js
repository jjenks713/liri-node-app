require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var value = process.argv[3];
var bitURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp&date=upcoming";
var omdbURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
if (!value) {
    value = "Mr Nobody";
}
switch (action) {
    case "concert-this":
        bit();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        ombd();
        break;

    case "do-what-it-says":
        doIt();
        break;
}

function spotifyThis(){
    spotify
    .search({ type: 'track', query: value, limit: 1 })
    .then(function (response) {
        var items = response.tracks.items;
        // console.log(items);
        for (var i = 0; i < items.length; i++) {
            var itemsArr = items[i];
            console.log("Artist: " + itemsArr.album.artists[0].name + "\n");
            console.log("Song Name: " + itemsArr.name + "\n");
            console.log("Spotify Link: " + itemsArr.external_urls.spotify + "\n");
            console.log("Album: " + itemsArr.album.name + "\n");
        }
    })
    .catch(function (err) {
        console.log(err);
    });
}


function ombd() {
    // call axios
    axios
        .get(omdbURL)
        .then(function (response) {

            console.log("Movie: " + response.data.Title + "\n");
            console.log("Date Released: " + response.data.Year + "\n");
            console.log("IMBD Rating: " + response.data.imdbRating + "\n");
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value + "\n");
            console.log("Studio: " + response.data.Production + "\n");
            console.log("Languages: " + response.data.Language + "\n");
            console.log("Plot: " + response.data.Plot + "\n");
            console.log("Cast: " + response.data.Actors + "\n");

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

// Bands in Town API
// app_id=codingbootcamp
function bit() {
    axios
        .get(bitURL)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var dataArr = response.data[i];
                var date = moment(dataArr.datetime).format('MMMM Do YYYY, h:mm:ss a')
                console.log("Venue: " + dataArr.venue.name);
                console.log("City: " + dataArr.venue.city);
                console.log("Date: " + date);
            };
            if (!response.data.length) {
                console.log("Sorry no upcoming Events for this Artist!");
            }
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


function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            
            data = data.split(", ");
            console.log(data);
            spotify
            .search({ type: 'track', query: data, limit: 1 })
            .then(function (response) {
                var items = response.tracks.items;
                // console.log(items);
                for (var i = 0; i < items.length; i++) {
                    var itemsArr = items[i];
                    console.log("Artist: " + itemsArr.album.artists[0].name);
                    console.log("Song Name: " + itemsArr.name);
                    console.log("Spotify Link: " + itemsArr.external_urls.spotify);
                    console.log("Album: " + itemsArr.album.name);
                }
            })
        }
    })
}
