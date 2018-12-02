var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var journalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        body: {
            required: true,
            type: String
        },
        tags: {
            type: [String]
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt', updatedAt: 'updatedAt'
        }
    }
);
journalSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Journal', journalSchema, 'journals');