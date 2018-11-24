var mongoose = require('mongoose');

var journalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        creator: {
            required: true,
            trim: true,
            type: String
        },
        body: {
            required: true,
            type: String
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt', updatedAt: 'updatedAt'
        }
    }
);

module.exports = mongoose.model('Journal', journalSchema, 'journals');