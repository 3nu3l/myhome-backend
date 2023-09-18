const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const realEstateCompaniesSchema = new mongoose.Schema({
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

realEstateCompaniesSchema.plugin(AutoIncrement, { id: 'real_estate_companies_seq', inc_field: '_id' });
module.exports = mongoose.model('RealEstateCompanies', realEstateCompaniesSchema);
