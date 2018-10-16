var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var db = require("./models")

mongoose.connect("mongodb://localhost/scraperHW", { useNewUrlParser: true });

app.get("/api/patriots", function(req, res){
    axios.get("https://www.patriots.com").then(function(response){
        var $ = cheerio.load(response.data);

        $("div.nfl-o-headlinestack__itemcontent").each(function(i, element){
            var link = "https:/www.patriots.com"+$(element).children().attr("href");
            var title = $(element).children().text();
            var result = {};
            result.title = title;
            result.link = link;

            console.log(result);

            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                console.log(err);
            });
        })
        res.redirect("SCRAPED");
    });
});

app.get("/articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
})

app.listen(8080, function() {
    console.log("App is running on 8080");
});
