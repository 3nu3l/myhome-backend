const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const visitsSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    fantasyName: {
        type: String,
    },
    contactEmail: {
        type: String,
    },
    rating: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

visitsSchema.plugin(AutoIncrement, { id: 'visits_seq', inc_field: '_id' });
module.exports = mongoose.model('visits', visitsSchema);
