# LIRI Bot
Liri bot is a node application which can perform 4 different functions. You can:
* Search for information about a song from Spotify
* Search for information about a movie
* View the last 20 tweets from my twitter
* Run any of the above functions from a text file.
It logs the output on the console and into a log.txt file with the timestamp.

## Usage

### Spotify:
To search for information about a song use this command in your terminal-

    $ node liri.js spotify-this-song <name of song here>

### Movie:
To search for information about a movie use this command in your terminal-

    $ node liri.js movie-this <name of movie here>

### Twitter:
To view the last 20 tweets from my twitter use this command in your terminal-

    $ node liri.js my-tweets

### Random:
To run the command present in the random.txt file use this command in your terminal-

    $ node liri.js do-what-it-says


## Under the hood

This bot uses various npm packages to perform the various tasks.
* [Spotify](https://www.npmjs.com/package/node-spotify-api) - Spotify search 
* [OMDB api](http://www.omdbapi.com/) - Movie database used to retreive information
* [request](https://www.npmjs.com/package/request) - Used to make a https request
          
* [Twitter](https://www.npmjs.com/package/twitter) - Retreive tweets
* [file-system](https://www.npmjs.com/package/file-system) - Reading and writing to files.
* [log4js](https://www.npmjs.com/package/log4js) - Logging data on the console and into log.txt



