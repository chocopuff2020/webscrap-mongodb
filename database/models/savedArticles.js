const mongoose = require('mongoose');
const CommentSchema = require('./comment');
const Schema = mongoose.Schema;

const savedArticlesSchema = new Schema({
    title: title,
    link: link
});

const savedArticles = mongoose.model('savedArticles', savedArticlesSchema);

module.exports = savedArticles;