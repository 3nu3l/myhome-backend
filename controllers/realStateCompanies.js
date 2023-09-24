const jwt = require('jsonwebtoken');
const User = require('../models/realStateCompanies');
const bcrypt = require('bcrypt');

exports.createRSC = async (req, res) => {
    /*  
        #swagger.description = Create a real state company
        #swagger.parameters['body'] = {
            in: 'body',
            description: "Real State Company to create",
            required: true,
            schema: {
                key: "value"
            }
        }
        #swagger.tags = ['Real State Companies']
    */
    const {
        key,
    } = req.body;
    if (key === "no se puede crear") {
        res.status(409).json({ success: false, message: "Dummy response" })
    }
    res.status(201).json({ success: true, message: "Dummy response" });
};

exports.updateRSC = async (req, res) => {
    /*  
        #swagger.description = Update a real estate company
        #swagger.parameters['id'] = {
            in: 'path',
            description: "Real State Company ID.",
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
        #swagger.tags = ['Real State Companies']
    */
    const {
        id,
    } = req.path;
    if (id === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.updateFieldRSC = async (req, res) => {
    /*  
        #swagger.description = Update a field for a real estate company
        #swagger.parameters['id'] = {
            in: 'path',
            description: "Real State Company ID.",
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
        #swagger.tags = ['Real State Companies']
    */
    const {
        id,
    } = req.path;
    if (id === "no existe") {
        res.status(404).json({ success: false, message: "Dummy response" })
    }
    res.status(200).json({ success: true, message: "Dummy response" });
};