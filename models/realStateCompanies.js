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

realEstateCompaniesSchema.statics.isThisEmailInUse = async function (contactEmail) {
    if (!contactEmail) throw new Error('Email inválido');
    try {
        const rsc = await this.findOne({ contactEmail });
        if (rsc) return false;

        return true;
    } catch (error) {
        console.log('Error en isThisEmailInUse method', error.message);
        return false;
    }
};

realEstateCompaniesSchema.plugin(AutoIncrement, { id: 'real_estate_companies_seq', inc_field: '_id' });
module.exports = mongoose.model('RealEstateCompanies', realEstateCompaniesSchema);
