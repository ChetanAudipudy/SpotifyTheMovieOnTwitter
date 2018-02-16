require("dotenv").config();
var keys = require("./keys.js");
var fs = require("file-system");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var log4js = require('log4js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//log4js for logging information to the console and to a text file ---- Suggestion by Chris

log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: { type: 'file', filename: 'log.txt' }
  },
  categories: {
    default: { appenders:['out', 'app'], level: 'all' }
  }
});
var logger = log4js.getLogger();
logger.level = 'all';



var input = process.argv[2];
switch(input){

    //Spotify
    case 'spotify-this-song':

        var title = "";

        for(var i = 3; i < process.argv.length; i++){
          title += process.argv[i] + " ";
        }

        spotifySong(title);
        // console.log(title);
        break;

    //Twitter
    case 'my-tweets':
          tweet();
          break;

    //OMDB movie api
    case 'movie-this':
    var movieName = "";
    for(var i = 3; i < process.argv.length; i++){
        movieName += process.argv[i] + " ";      
    }

    movieSearch(movieName);
    break;

    //Input from random.txt

    case 'do-what-it-says':
    random();
    break;

    default:
    logger.all("Input is invalid.");

}

//Functions

//Function for spotify
function spotifySong(title){
  // console.log(title);
    if(title === ""){
    spotify.search({ type: 'track', query: 'the sign ace of base' }, function(err, data) {
        if (err) {
          return logger.all('Error: ' + err);
        }      
        logger.all("Artist(s): " + data.tracks.items[0].artists[0].name);
        logger.all("Song name: " + data.tracks.items[0].name);
        logger.all("Preview link: " + data.tracks.items[0].preview_url);
        logger.all("Album: " + data.tracks.items[0].album.name + "\n");
    });
    }else{
    spotify.search({type: 'track', query: title }, function(err, data) {
        if (err) {
          return logger.all('Error: ' + err);
        }      
      logger.all("Artist(s): " + data.tracks.items[0].artists[0].name);
      logger.all("Song name: " + data.tracks.items[0].name);
			logger.all("Preview link: " + data.tracks.items[0].preview_url);
			logger.all("Album: " + data.tracks.items[0].album.name + "\n");
      });
    }

};


//Function for twitter
function tweet (){
    var params = {screen_name: 'LiriChetan'};
    var i = 20;
    client.get('statuses/user_timeline',params, function(error, tweets, response) {
        while (i--){
        if (!error) {
           logger.all("Tweet: " + tweets[i].text);
           logger.all("Created at : " + tweets[i].created_at);
           logger.all("-----------\n")
           
        }
        else {
          logger.all("Error : " + error);
        }
    }
      });
}

//Function for searching a movie using OMDB
function movieSearch(movieName){
  // console.log(movieName)
  if(movieName === ""){
    request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
     if (!error && response.statusCode === 200) {
         logger.all("Title: " + JSON.parse(body).Title);
         logger.all("Release Year: " + JSON.parse(body).Year);
         logger.all("IMDB Rating: " + JSON.parse(body).imdbRating);
         logger.all("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
         logger.all("Country where movie was produced: " + JSON.parse(body).Country);
         logger.all("Language: " + JSON.parse(body).Language);
         logger.all("Plot: " + JSON.parse(body).Plot);
         logger.all("Actors: " + JSON.parse(body).Actors + "\n");
     }
   });
  }
  else{
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
     if (!error && response.statusCode === 200) {
         logger.all("Title: " + JSON.parse(body).Title);
         logger.all("Release Year: " + JSON.parse(body).Year);
         logger.all("IMDB Rating: " + JSON.parse(body).imdbRating);
         logger.all("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
         logger.all("Country where movie was produced: " + JSON.parse(body).Country);
         logger.all("Language: " + JSON.parse(body).Language);
         logger.all("Plot: " + JSON.parse(body).Plot);
         logger.all("Actors: " + JSON.parse(body).Actors + "\n");
     }
   });

  }
}


//Function for reading random.txt
function random(){

  fs.readFile("random.txt" , "utf8" , function (err, data){

    if(err){
      logger.all("Error: " + err);
    }

    var dataArr = data.split(",");
    var command = dataArr[0];
    var data = dataArr[1];

    switch(command){

      case('my-tweets'):
      tweet();
      break;

      case('spotify-this-song'):
      var title = data;
      // console.log(title);

      spotifySong(title);
      break;

      case('movie-this'):
      movieSearch(data);
      break;

      default:
      logger.all("File is empty, input is invalid");
    }

  })

}