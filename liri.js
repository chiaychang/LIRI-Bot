var command = process.argv[2];
var input = process.argv.slice(3).join();
var fs = require("fs");
// console.log(input);


    function liriInitiate() {
        if (command == "my-tweets") {
            console.log("");
            console.log("============ Tweets from JOY! ^(#｀∀´)_Ψ････・･†_(ﾟｰﾟ*)β ====================");
            console.log("");
            myTweets();
        } else if (command == "spotify-this-song") {
            console.log("");
            console.log("============ Spotify! ♪（＊＾ω＾）♪♪♪ ｡+ﾟ.。(人´∀｀)．☆．。．:*･°♪♪============");
            console.log("");
            spotifySearch();
        } else if (command == "movie-this") {
            console.log("");
            console.log("============ Movie Time!゜☆ ♡ ♡ *ヾ(⺣◡⺣)_且且_ヾ(‘∀｀=ヽ)※．；，゜☆ =========");
            console.log("");
            omdbSearch();
        } else if (command == "doWhatever") {
            console.log("");
            console.log("============ Take a Chance!(*’▽’)ノ＾—==ΞΞΞ☆");
            doWhatever();
        }
    }

liriInitiate();

// my-tweets 
function myTweets() {

    var keys = require("./keys.js");
    var accountInfo = keys.twitterKeys;

    var Twitter = require('twitter');

    var client = new Twitter(accountInfo);
    var params = { screen_name: 'chiaychang' };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log('Error occurred: ' + error);
        } else if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("#" + (1 + i) + ": " + tweets[i].text);
            }

        }
    });
}

// spotify-this-song
function spotifySearch() {

    var spotify = require('spotify');

    if (!input){
    	input = "The Sign Ace of Base";
    }

    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        } else if (!err) {
            // console.log(JSON.stringify(data.tracks.items[0],null,2));
            //artist(s) name
            var search = data.tracks.items[0];
            console.log("♪//♪ Artist(s) ♪//♪");
            for (var j = 0; j < search.artists.length; j++) {
                console.log("  " + search.artists[j].name);
            }
            console.log("----------------------");
            //song name
            console.log("♪//♪ Song Title ♪//♪");
            console.log("  " + search.name);
            console.log("----------------------");
            //preview link
            console.log("♪//♪ Preview Link ♪ Take a Listen! ♪//♪ ");
            console.log("  " + search.preview_url);
            console.log("----------------------");
            //album name
            console.log("♪//♪ Album Name ♪//♪");
            console.log("  " + search.album.name);
        }
    });
}

// movie-this
function omdbSearch() {

    var request = require("request");

    if (!input){
    	input = "mr,nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json";
    var rottenTomatosURL = "https://www.rottentomatoes.com/m/" + input.split(",").join("_");
    // if (!process.argv[3]) {
    //     movieName = "mr nobody";
    //     rottenTomatosURL = "https://www.rottentomatoes.com/m/mr_nobody";
    // }

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            var result = JSON.parse(body);

            console.log("* Title: " + result.Title);
            console.log("* Year: " + result.Year);
            console.log("* IMDB Rating: " + result.imdbRating);
            console.log("* Country: " + result.Country);
            console.log("* Language: " + result.Language);
            console.log("* Plot: " + result.Plot);
            console.log("* Actors: " + result.Actors);
            console.log("* Rotten Tomatos Rating: " + result.Ratings[1].Value);
            console.log("* Rotten Tomatos URL: " + rottenTomatosURL);

        }
    });
}

// do-what-it-says
function doWhatever() {
   
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        // console.log(dataArr);
        var action = dataArr[Math.floor(Math.random() * dataArr.length)].split("*"); 
        // console.log(action); 
        command = action[0];
        input = action[1].split(" ").join(",");
        liriInitiate();
    });

}


