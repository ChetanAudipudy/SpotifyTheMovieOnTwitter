LIRI Bot


Liri bot is a node application which can perform 4 different functions. You can:
* Search for information about a song from Spotify
* Search for information about a movie
* View the last 20 tweets from my twitter
* Run any of the above functions from a text file.
It logs the output on the console and into a log.txt file with the timestamp.

Usage

Spotify:
To search for information about a song use this command in your terminal-
$ node liri.js spotify-this-song <name of song here>

Movie:
To search for information about a movie use this command in your terminal-
$ node liri.js movie-this <name of movie here>

Twitter:
To view the last 20 tweets from my twitter use this command in your terminal-
$ node liri.js my-tweets

Twitter:
To run the command present in the random.txt file use this command in your terminal-
$ node liri.js do-what-it-says


Under the hood

This bot uses various npm packages to perform the various tasks.
* Spotify : node-spotify-api (https://www.npmjs.com/package/node-spotify-api)
* Movie :	OMDB api (http://www.omdbapi.com/) 
request npm package(https://www.npmjs.com/package/request)
* Twitter: twitter (https://www.npmjs.com/package/twitter)
* Reading files: file-system (https://www.npmjs.com/package/file-system)
* Logging data : log4js (https://www.npmjs.com/package/log4js)



