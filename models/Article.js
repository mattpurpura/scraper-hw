var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        unique: true, 
        required: true 
    },
    link: {
        type: String, 
        unique: true, 
        required: true
    },
    note: {
        type: Schema.ObjectId, 
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;