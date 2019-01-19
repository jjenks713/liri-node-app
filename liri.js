require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var value = process.argv[3];

if (!value && action === "movie-this") {
    value = "Mr Nobody";
}
var omdbURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

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
        var divider = "\n------------------------------------------------------------\n\n";
        for (var i = 0; i < items.length; i++) {
            var itemsArr = items[i];

            var spotify = ["\nArtist: " + itemsArr.album.artists[0].name,
            "\n\nSong Name: " + itemsArr.name,
            "\n\nSpotify Link: " + itemsArr.external_urls.spotify,
            "\n\nAlbum: " + itemsArr.album.name + "\n"]

            console.log("\nArtist: " + itemsArr.album.artists[0].name,
            "\n\nSong Name: " + itemsArr.name,
            "\n\nSpotify Link: " + itemsArr.external_urls.spotify,
            "\n\nAlbum: " + itemsArr.album.name + "\n");

            fs.appendFile("log.txt", spotify + divider, function(err) {
                if (err) throw err;
               
              });
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
            var divider = "\n------------------------------------------------------------\n\n";
            var movieData = ["Movie: " + response.data.Title,
            "\n\nDate Released: " + response.data.Year,
            "\n\nIMBD Rating: " + response.data.imdbRating,
            "\n\nRotten Tomatoes: " + response.data.Ratings[1].Value,
            "\n\nStudio: " + response.data.Production,
            "\n\nLanguages: " + response.data.Language,
            "\n\nPlot: " + response.data.Plot,
            "\n\nCast: " + response.data.Actors]

            console.log("\nMovie: " + response.data.Title,
            "\n\nDate Released: " + response.data.Year,
            "\n\nIMBD Rating: " + response.data.imdbRating,
            "\n\nRotten Tomatoes: " + response.data.Ratings[1].Value,
            "\n\nStudio: " + response.data.Production,
            "\n\nLanguages: " + response.data.Language,
            "\n\nPlot: " + response.data.Plot,
            "\n\nCast: " + response.data.Actors);

            fs.appendFile("log.txt", movieData + divider, function(err) {
                if (err) throw err;
               
              });

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

    var bitURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp&date=upcoming";
    axios
        .get(bitURL)
        .then(function (response) {
            var dataArr = [response.data[0], response.data[1], response.data[2], response.data[3], response.data[4]]
            console.log(dataArr[0].venue.name);
            for (var i = 0; i < dataArr.length; i++) {
                var bandStuff = dataArr[i];
                var date = moment(bandStuff.datetime).format('MM/DD/YY');

                var BITData = ["\nVenue: " + bandStuff.venue.name,
                "\n\nCity: " + bandStuff.venue.city,
                "\n\nDate: " + date + "\n"];
                
                console.log("\nVenue: " + bandStuff.venue.name,
                "\n\nCity: " + bandStuff.venue.city,
                "\n\nDate: " + date + "\n");

                fs.appendFile("log.txt", BITData, function(err) {
                    if (err) throw err;
                   
                  });
            };

            var divider = "\n------------------------------------------------------------\n\n";
            fs.appendFile("log.txt", divider, function(err) {
                if (err) throw err;
               
              });
            
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
                    console.log("Artist: " + itemsArr.album.artists[0].name + "\n");
                    console.log("Song Name: " + itemsArr.name + "\n");
                    console.log("Spotify Link: " + itemsArr.external_urls.spotify + "\n");
                    console.log("Album: " + itemsArr.album.name + "\n");
                }
            })
        }
    })
}
