const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    articleId : String,
    notes: String
});

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;