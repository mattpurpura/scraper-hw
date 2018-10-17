var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var app = express();

var PORT = process.env.PORT || 8080

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var db = require("./models")

var databaseUri = 'mongodb://localhost/scraperHW';

if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
}
else{
    mongoose.connect(databaseUri);
}


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
        res.redirect("/");
    });
});

app.get("/articles", function(req, res){
    db.Article.find({})
    .populate('note')
    .then(function(dbArticle){
        res.json(dbArticle);
    })
})

app.get("/articles/:id", function(req, res){
    db.Article.find({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err){
        res.json(err);
    })
})

app.post("/articles/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote){
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
    })
    .then(function(){
        res.redirect("/");
    })
    .catch(function(err){
        res.json(err);
    })
})

app.delete("/delete/:id", function(req, res){
    db.Note.findOneAndRemove({_id: req.params.id}, function(){
    
    })
    .then(function(){
        console.log("PURGED")
    })
    .catch(function(err){
        res.json(err);
    })
})


app.listen(PORT, function() {
    console.log("App is running on 8080");
});
