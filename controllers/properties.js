const jwt = require('jsonwebtoken');
const User = require('../models/properties');
const bcrypt = require('bcrypt');

exports.createProperty = async (req, res) => {
    /*  
        #swagger.description = Create a property
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                key: "value"
            }
        }
        #swagger.tags = ['Properties']
    */
    const {
        key,
    } = req.body;
    if (key === "no se puede crear") {
        res.status(409).json({ success: false, message: "Dummy response" })
    }
    res.status(201).json({ success: true, message: "Dummy response" });
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
        #swagger.parameters['search'] = {
            in: 'query',
            description: "Filter by property characteristics.",
            required: false,
            type: "array"
        }
        #swagger.tags = ['Properties']
    */
    const {
        latitude,
        longitude
    } = req.query;
    if (latitude === "no existe" && longitude === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }
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
        #swagger.parameters['body'] = {
            in: 'body',
            description: "Fields to update.",
            required: true,
            schema: {
                key: "value"
            }
        }
        #swagger.tags = ['Properties']
    */
    const {
        id,
    } = req.path;
    if (id === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.updateFieldProperty = async (req, res) => {
    /*  
        #swagger.description = Update a field for a property
        #swagger.parameters['id'] = {
            in: 'path',
            description: "Property ID.",
            required: true,
            type: "number"
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: "Field to update.",
            required: true,
            schema: {
                key: "value"
            }
        }
        #swagger.tags = ['Properties']
    */
    const {
        id,
    } = req.path;
    if (id === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.getAppointments = async (req, res) => {
    /*  
        #swagger.description = Get appointments for a property
        #swagger.parameters['PropertyID'] = {
            in: 'query',
            description: "Property ID.",
            required: true,
            type: "number"
        }
        #swagger.tags = ['Properties']
    */
    const {
        PropertyID
    } = req.query;
    if (PropertyID === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }

    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.createAppointments = async (req, res) => {
    /*  
        #swagger.description = Create a appointment
        #swagger.parameters['body'] = {
            in: 'body',
            description: "Appointment to create",
            required: true,
            schema: {
                key: "value"
            }
        }
        #swagger.tags = ['Properties']
    */
    const {
        key,
    } = req.body;
    if (key === "no se puede crear") {
        res.status(409).json({ success: false, message: "Dummy response" })
    }
    res.status(201).json({ success: true, message: "Dummy response" });
};

exports.deleteProperty = async (req, res) => {
    /*  
        #swagger.description = Delete a property
        #swagger.parameters['id'] = {
            in: 'path',
            description: "Property ID.",
            required: true,
            type: "number"
        }
        #swagger.tags = ['Properties']
    */
    const {
        id,
    } = req.path;
    if (id === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }

    res.status(204).json({ success: true, message: "Dummy response" });
};