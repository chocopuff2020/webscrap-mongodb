const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedArticlesSchema = new Schema({
    title: String,
    link: String
});

const SavedArticles = mongoose.model('SavedArticles', SavedArticlesSchema);

module.exports = SavedArticles;