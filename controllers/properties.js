const jwt = require('jsonwebtoken');
const Properties = require('../models/properties');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createProperty = async (req, res) => {
    /*  
        #swagger.description = Create a property
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                currency: {
                    '@enum': [
                        "ars",
                        "usd"
                    ]
                },
                description: "Una descripción detallada de la propiedad.",
                associatedRealEstate: "email@inmobiliaria.com (se obtiene del usuario logueado con rol business)",
                address: {
                    street: "Calle Falsa",
                    number: "123",
                    floor: "4",
                    department: "A",
                    district: "Distrito Central",
                    town: "Ciudad Gótica",
                    province: "Provincia",
                    country: "País"
                },
                geolocation: {
                    latitude: "-34.603722",
                    longitude: "-58.381592"
                },
                rooms: "5",
                bedrooms: "3",
                bathrooms: "2",
                hasTerrace: true,
                hasBalcony: false,
                garage: "1",
                hasStorageRoom: true,
                age: "20",
                propertyType: {
                    '@enum': [
                        "casa",
                        "ph",
                        "departamento",
                        "local",
                        "oficina",
                        "galpon",
                        "terreno"
                    ]
                },
                squareMeters: {
                    covered: "100",
                    semiCovered: "50",
                    uncovered: "30"
                },
                frontOrBack: {
                    '@enum': [
                        "frente",
                        "contrafrente"
                    ]
                },
                orientation: {
                    '@enum': [
                        "norte",
                        "sur",
                        "este",
                        "oeste"
                    ]
                },
                amenities: [
                        "quincho",
                        "pileta",
                        "jacuzzi",
                        "sauna",
                        "SUM",
                        "sala de juegos"
                ],
                photos: [
                    "http://example.com/photo1.jpg",
                    "http://example.com/photo2.jpg"
                ],
                video: "http://example.com/videotour.mp4",
                price: "250000.00",
                expensesPrice: "5000.00",
                status: {
                    '@enum': [
                        "en alquiler",
                        "en venta",
                        "reservada",
                        "alquilada",
                        "vendida"
                    ]
                }
            }
        }
        #swagger.tags = ['Properties']
    */

    const {
        description,
        associatedRealEstate,
        address,
        geolocation,
        rooms,
        bedrooms,
        bathrooms,
        hasTerrace,
        hasBalcony,
        garage,
        hasStorageRoom,
        age,
        propertyType,
        squareMeters,
        frontOrBack,
        orientation,
        amenities,
        photos,
        video,
        price,
        expensesPrice,
        status
    } = req.body;

    try {
        const isBusiness = await User.isThisEmailInUse(associatedRealEstate);
        if (!isBusiness) {
            return res.status(403).json({ success: false, message: "The user doesn't have permission to create properties. You'll need business role." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

    try {
        const newProperty = await Properties({
            description,
            associatedRealEstate,
            address,
            geolocation,
            rooms,
            bedrooms,
            bathrooms,
            hasTerrace,
            hasBalcony,
            garage,
            hasStorageRoom,
            age,
            propertyType,
            squareMeters,
            frontOrBack,
            orientation,
            amenities,
            photos,
            video,
            price,
            expensesPrice,
            status
        });

        await newProperty.save();

        res.status(201).json({ success: true, message: "Property created successfully", property: newProperty });
    } catch (error) {
        return res.status(409).json({ success: false, message: "Property cannot be created" });
    }
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