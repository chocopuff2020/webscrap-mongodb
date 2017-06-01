const mongoose = require('mongoose');
const CommentSchema = require('./comment');
const Schema = mongoose.Schema;

const ScrappedDataSchema = new Schema({
    title: title,
    link: link
});

const ScrappedData = mongoose.model('scrapedData', ScrappedDataSchema);

module.exports = ScrappedData;