const jwt = require('jsonwebtoken');
const User = require('../models/properties');
const bcrypt = require('bcrypt');

exports.createProperty = async (req, res) => {
    /*  
        #swagger.description = Create a property
        #swagger.parameters['body'] = {
          in: 'body',
          required: false
        }
        #swagger.tags = ['Properties']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.getProperties = async (req, res) => {
    /*  
        #swagger.description = Obtain a property with parameters
        #swagger.parameters['latitude'] = {
            in: 'query',
            description: "Latitude to filter properties.",
            required: false,
            type: "number"
        }
        #swagger.parameters['longitude'] = {
            in: 'query',
            description: "Longitude to filter properties.",
            required: false,
            type: "number"
        }
        #swagger.parameters['email'] = {
            in: 'query',
            description: "Email of the user to fetch favorite properties.",
            required: false,
            type: "number"
        }
        #swagger.parameters['areFavorites'] = {
            in: 'query',
            description: "Favorites propierties for user",
            required: false,
            type: "boolean"
        }
        #swagger.tags = ['Properties']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.updateProperty = async (req, res) => {
    /*  
        #swagger.description = Update a property
        #swagger.parameters['id'] = {
            in: 'path',
            description: "Property ID.",
            required: true,
            type: "number"
        }
        #swagger.tags = ['Properties']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.updateFieldProperty = async (req, res) => {
    /*  
        #swagger.description = Update a field for a property
        #swagger.tags = ['Properties']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};