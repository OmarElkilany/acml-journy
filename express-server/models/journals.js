var mongoose = require('mongoose');

var journalSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
		required: true
    },
    creator: {
        type: String,
        trim: true,
        required: true,
    },
    body: {
        required: true,
        type: String
    },
    touchDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Journal', journalSchema, 'journals');