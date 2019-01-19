# liri-node-app
Backend app to search through Spotify, Bands in town and OMDB api's.

Your commands will be:

node liri.js concert-this "Band/Artist"

This will search the Bands in town API and bring back info on upcoming shows; 
  * Name of the venue
  * Venue location
  * Date of the Event


node liri.js spotify-this-song "Song Name"
 
This will search spotify for info on song name input; 
  * Artist(s)
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from
  
  
node liri.js movie-this "Movie-Name" (if no movie name is put in it will default to "Mr Nobody"
 
This will search OMBD for info on movie input;   
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

node liri.js do-what-it-says (this will search whatever command is in the text file)

Enjoy!
