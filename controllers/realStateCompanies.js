const User = require('../models/user');
const Property = require('../models/properties');
const sendMail = require('./email');
const Appointment = require('../models/appointment');


exports.createRSC = async (req, res) => {
    /*  
        #swagger.description = Create a Real State Company
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                fantasyName: "Argento",
                email: "review@gmail.com",
                password: "",
                contactEmail: "review@gmail.com",
                role: "business"
            }
        }
        #swagger.tags = ['Real State Companies']
    */
    const {
        fantasyName,
        email,
        contactEmail,
        password,
        role
    } = req.body;
    const isNewRSC = await User.isThisEmailInUse(email);
    if (!isNewRSC) {
        return res.status(409).json({
            success: false,
            message: 'Este email ya existe en la plataforma. Si no recuerda la contraseña la puede recuperar',
        });
    }
    const rsc = await User({
        fantasyName,
        email,
        contactEmail,
        password,
        role
    });
    try {
        await sendMail.send(email, "Bienvenido " + fantasyName + " a My Home", "Bienvenido! Se creó la cuenta con éxito, ya podés crear propiedades.")
    } catch (error) {
        return res.status(409).json({
            success: false,
            message: 'No se puede enviar el email: ' + error.message,
        });
    }
    await rsc.save();
    res.status(201).json({ success: true, rsc });
};

exports.getRSC = async (req, res) => {
    /*  
        #swagger.description = 'Obtain a real state company with ID.'
        #swagger.parameters['id'] = {
            in: 'query',
            description: 'Real State Company ID.',
            required: true,
            type: 'number'
        }
        #swagger.tags = ['Real State Companies']
    */
    const { id } = req.query;
    try {
        const rsc = await User.findById(id);
        if (!rsc) {
            return res.status(404).json({ success: false, message: "Compañía inmobiliaria no encontrada" });
        }
        return res.status(200).json({ success: true, rsc });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener la compañía inmobiliaria: " + error.message });
    }
};

exports.getOwnProperties = async (req, res) => {
    /*  
        #swagger.description = 'Obtain properties for a real state company.'
        #swagger.parameters['id'] = {
            in: 'query',
            description: 'Real State Company ID for get own properties.',
            required: true,
            type: 'number'
        }
        #swagger.tags = ['Real State Companies']
    */
    const { id } = req.query;
    try {
        const properties = await Property.find({ owner: id });
        if (!properties) {
            return res.status(404).json({ success: false, message: "No se encontraron propiedades para esta compañía inmobiliaria" });
        }
        return res.status(200).json({ success: true, properties });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener las propiedades: " + error.message });
    }
};

exports.updateRSC = async (req, res) => {
    /*  
        #swagger.description = 'Update a real estate company.'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Real State Company ID.',
            required: true,
            type: 'number'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Fields to update.',
            required: true,
            schema: { key: 'value' }
        }
        #swagger.tags = ['Real State Companies']
    */
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedRSC = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRSC) {
            return res.status(404).json({ success: false, message: "Compañía inmobiliaria no encontrada" });
        }
        return res.status(200).json({ success: true, updatedRSC });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al actualizar la compañía inmobiliaria: " + error.message });
    }
};


exports.updateFieldRSC = async (req, res) => {
    /*  
        #swagger.description = 'Update a field for a real estate company.'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Real State Company ID.',
            required: true,
            type: 'number'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Field to update.',
            required: true,
            schema: { key: 'value' }
        }
        #swagger.tags = ['Real State Companies']
    */
    const { id } = req.params;
    const updateData = req.body;

    try {
        const rsc = await User.findById(id);
        if (!rsc) {
            return res.status(404).json({ success: false, message: "Compañía inmobiliaria no encontrada" });
        }

        Object.keys(updateData).forEach(key => {
            rsc[key] = updateData[key];
        });

        await rsc.save();

        return res.status(200).json({ success: true, message: "Campo actualizado exitosamente", rsc });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al actualizar el campo de la compañía inmobiliaria: " + error.message });
    }
};

exports.getAppointments = async (req, res) => {
    /*  
        #swagger.description = 'Get appointments for a real state company.'
        #swagger.parameters['RealStateID'] = {
            in: 'query',
            description: 'Real State Company ID.',
            required: true,
            type: 'number'
        }
        #swagger.tags = ['Real State Companies']
    */
    const { RealStateID } = req.query;
    try {
        const appointments = await Appointment.find({ realStateCompany: RealStateID });
        if (!appointments) {
            return res.status(404).json({ success: false, message: "No se encontraron citas para esta compañía inmobiliaria" });
        }
        return res.status(200).json({ success: true, appointments });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al obtener las citas: " + error.message });
    }
};

exports.deleteRSC = async (req, res) => {
    /*  
        #swagger.description = 'Delete a real estate company.'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Real State Company ID.',
            required: true,
            type: 'number'
        }
        #swagger.tags = ['Real State Companies']
    */
    const { id } = req.params;
    try {
        const deletedRSC = await User.findByIdAndDelete(id);
        if (!deletedRSC) {
            return res.status(404).json({ success: false, message: "Compañía inmobiliaria no encontrada" });
        }
        return res.status(200).json({ success: true, message: "Compañía inmobiliaria eliminada exitosamente" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error al eliminar la compañía inmobiliaria: " + error.message });
    }
};
