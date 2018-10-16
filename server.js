var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

app.use(express.static("public"));

var databaseUrl = "zoo_db";
var collections = ["animals"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
    console.log("Database Error: ", error);
});

app.get("/", function(req, res){
    res.send("Hello World");
});

app.get("/all", function(req, res){
    db.animals.find({}, function(err, found){
        if(err) throw err;
        res.json(found);
    })
})

app.get("/api/patriots", function(req, res){
    axios.get("https://www.patriots.com").then(function(response){
        var $ = cheerio.load(response.data);

        var results = [];

        $("div.nfl-o-headlinestack__itemcontent").each(function(i, element){
            var title = "https:/www.patriots.com"+$(element).children().attr("href");

            results.push(title);
        })
        console.log(results);
        res.json(results);
    });
});

app.get("/api/team/:team-name", function(req, res){
    team = req.body.team-name; 
    console.log(team);
    axios.get("https://www."+team+".com").then(function(response){
        var $ = cheerio.load(response.data);

        var results = [];

        $("div.nfl-o-headlinestack__itemcontent").each(function(i, element){
            var title = "https:/www.patriots.com"+$(element).children().attr("href");

            results.push(title);
        })
        console.log(results);
        res.json(results);
    });
});


app.listen(8080, function() {
    console.log("App is running on 8080");
});
