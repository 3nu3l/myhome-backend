const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const propertiesSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    address: {
        street: String,
        number: Number,
        floor: Number,
        department: String,
        district: String,
        town: String,
        province: String,
        country: String
    },
    geolocation: {
        latitude: String,
        longitude: String
    },
    propertyType: {
        type: String,
        enum: ['casa', 'ph', 'departamento', 'local', 'oficina', 'galpon', 'terreno']
    },
    squareMeters: {
        covered: Number,
        semiCovered: Number,
        uncovered: Number
    },
    rooms: Number,
    bedrooms: Number,
    bathrooms: Number,
    hasTerrace: Boolean,
    hasBalcony: Boolean,
    garage: Number,
    hasStorageRoom: Boolean,
    frontOrBack: {
        type: String,
        enum: ['frente', 'contrafrente']
    },
    age: Number,
    orientation: {
        type: String,
        enum: ['norte', 'sur', 'este', 'oeste']
    },
    amenities: {
        type: String,
        enum: ['quincho', 'pileta', 'jacuzzi', 'sauna', 'SUM', 'sala de juegos']
    },
    description: String,
    photos: [String],
    video: { type: String, required: false },
    price: Number,
    expensesPrice: Number,
    status: {
        type: String,
        enum: ['en alquiler', 'en venta', 'reservada', 'alquilada', 'vendida']
    },
    associatedRealEstate: {
        type: String,
        required: true,
        ref: 'User'
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

propertiesSchema.plugin(AutoIncrement, { id: 'properties_seq', inc_field: '_id' });
module.exports = mongoose.model('Properties', propertiesSchema);
