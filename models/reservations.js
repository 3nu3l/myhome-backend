const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Double } = require('bson');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const reservationsSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    fantasyName: {
        type: String,
    },
    users: {
        // User IDs
        type: [Number],
    },
    property: {
        // Property ID
        type: Number
    },
    rentAmount: {
        type: Double
    },
    reservationStatus: {
        type: String
    },
    realEstateCompanyRating: {
        type: Number
    },
    realEstateCompanyComment: { 
        type: String
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

reservationsSchema.plugin(AutoIncrement, { id: 'reservations_seq', inc_field: '_id' });
module.exports = mongoose.model('reservations', reservationsSchema);
