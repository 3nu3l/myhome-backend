const jwt = require('jsonwebtoken');
const User = require('../models/realStateCompanies');
const bcrypt = require('bcrypt');

exports.createRSC = async (req, res) => {
    /*  
        #swagger.description = Create a real state company
        #swagger.tags = ['Real State Companies']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.updateRSC = async (req, res) => {
    /*  
        #swagger.description = Update a real estate company
        #swagger.tags = ['Real State Companies']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};

exports.updateFieldRSC = async (req, res) => {
    /*  
        #swagger.description = Update a field for a real estate company
        #swagger.tags = ['Real State Companies']
    */
    res.status(200).json({ success: true, message: "Dummy response" });
};