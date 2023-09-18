const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const propertiesSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

propertiesSchema.plugin(AutoIncrement, { id: 'properties_seq', inc_field: '_id' });
module.exports = mongoose.model('Properties', propertiesSchema);
