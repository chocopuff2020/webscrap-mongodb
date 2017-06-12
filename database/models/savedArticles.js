const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedArticlesSchema = new Schema({
    title: String,
    link: String,
    notes:[{
        type: Schema.Types.ObjectId, //This is how we refer to another COLLECTION
        ref: 'Notes' //REMEMBER:'ref'is the name of the MODAL that we want to connect to
    }]
});

const SavedArticles = mongoose.model('SavedArticles', SavedArticlesSchema);

module.exports = SavedArticles;


// onClick={this.handleSaveClick(scrappedData)}