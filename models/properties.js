const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const propertiesSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    address: {
        street: String,
        number: String,
        floor: String,
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
        covered: String,
        semiCovered: String,
        uncovered: String
    },
    rooms: String,
    bedrooms: String,
    bathrooms: String,
    hasTerrace: String,
    hasBalcony: String,
    garage: String,
    hasStorageRoom: String,
    frontOrBack: {
        type: String,
        enum: ['frente', 'contrafrente']
    },
    age: String,
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
    price: String,
    expensesPrice: String,
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
