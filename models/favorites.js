const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const favoritesSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    user: {
        type: String,
        unique: true,
    },
    properties: {
        type: [String]
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

favoritesSchema.plugin(AutoIncrement, { id: 'favorites_seq', inc_field: '_id' });
module.exports = mongoose.model('favorites', favoritesSchema);
