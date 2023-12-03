const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const appointmentSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    propertyId: {
        type: String,
        required: true,
        ref: 'Properties'
    },
    clientId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

appointmentSchema.plugin(AutoIncrement, { id: 'appointment_seq', inc_field: '_id' });
module.exports = mongoose.model('Appointment', appointmentSchema);
