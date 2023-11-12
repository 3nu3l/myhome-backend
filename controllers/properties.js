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
        const email = associatedRealEstate;
        const user = await User.findOne({ email }).select('role');

        if (user.role != "business") {
            return res.status(403).json({ success: false, message: "The user doesn't have permission to create properties. You'll need business role." });
        }

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
        #swagger.description = Obtain a property with parameters.
        #swagger.parameters['description'] = {
            in: 'query',
            description: "Filter by property description.",
            required: false,
            type: "string"
        }
        #swagger.parameters['associatedRealEstate'] = {
            in: 'query',
            description: "Filter by associated real estate.",
            required: false,
            type: "string"
        }
        #swagger.parameters['street'] = {
            in: 'query',
            description: "Filter by street address in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['number'] = {
            in: 'query',
            description: "Filter by street number in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['floor'] = {
            in: 'query',
            description: "Filter by floor in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['department'] = {
            in: 'query',
            description: "Filter by department in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['district'] = {
            in: 'query',
            description: "Filter by district in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['town'] = {
            in: 'query',
            description: "Filter by town in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['province'] = {
            in: 'query',
            description: "Filter by province in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['country'] = {
            in: 'query',
            description: "Filter by country in the properties address.",
            required: false,
            type: "string"
        }
        #swagger.parameters['covered'] = {
            in: 'query',
            description: "Filter by square meters covered of the property.",
            required: false,
            type: "string"
        }
        #swagger.parameters['semiCovered'] = {
            in: 'query',
            description: "Filter by square meters semiCovered of the property.",
            required: false,
            type: "string"
        }
        #swagger.parameters['uncovered'] = {
            in: 'query',
            description: "Filter by square meters uncovered of the property.",
            required: false,
            type: "string"
        }
        #swagger.parameters['geolocation'] = {
            in: 'query',
            description: "Filter by property geolocation.",
            required: false,
            type: "string"
        }
        #swagger.parameters['rooms'] = {
            in: 'query',
            description: "Filter by number of rooms.",
            required: false,
            type: "string"
        }
        #swagger.parameters['bedrooms'] = {
            in: 'query',
            description: "Filter by number of bedrooms.",
            required: false,
            type: "string"
        }
        #swagger.parameters['bathrooms'] = {
            in: 'query',
            description: "Filter by number of bathrooms.",
            required: false,
            type: "string"
        }
        #swagger.parameters['hasTerrace'] = {
            in: 'query',
            description: "Filter by presence of a terrace.",
            required: false,
            type: "string"
        }
        #swagger.parameters['hasBalcony'] = {
            in: 'query',
            description: "Filter by presence of a balcony.",
            required: false,
            type: "string"
        }
        #swagger.parameters['garage'] = {
            in: 'query',
            description: "Filter by presence of a garage.",
            required: false,
            type: "string"
        }
        #swagger.parameters['hasStorageRoom'] = {
            in: 'query',
            description: "Filter by presence of a storage room.",
            required: false,
            type: "string"
        }
        #swagger.parameters['age'] = {
            in: 'query',
            description: "Filter by property age.",
            required: false,
            type: "string"
        }
        #swagger.parameters['propertyType'] = {
            in: 'query',
            description: "Filter by property type.",
            required: false,
            type: "string"
        }
        #swagger.parameters['frontOrBack'] = {
            in: 'query',
            description: "Filter by property facing front or back.",
            required: false,
            type: "string"
        }
        #swagger.parameters['orientation'] = {
            in: 'query',
            description: "Filter by property orientation.",
            required: false,
            type: "string"
        }
        #swagger.parameters['amenities'] = {
            in: 'query',
            description: "Filter by property amenities.",
            required: false,
            type: "string"
        }
        #swagger.parameters['photos'] = {
            in: 'query',
            description: "Filter by property photos.",
            required: false,
            type: "string"
        }
        #swagger.parameters['video'] = {
            in: 'query',
            description: "Filter by property video.",
            required: false,
            type: "string"
        }
        #swagger.parameters['price'] = {
            in: 'query',
            description: "Filter by property price.",
            required: false,
            type: "string"
        }
        #swagger.parameters['expensesPrice'] = {
            in: 'query',
            description: "Filter by property expenses price.",
            required: false,
            type: "string"
        }
        #swagger.parameters['status'] = {
            in: 'query',
            description: "Filter by property status.",
            required: false,
            type: "string"
        }
        #swagger.tags = ['Properties']
    */

    const {
        description,
        associatedRealEstate,
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
        status,
        street,
        number,
        floor,
        department,
        district,
        town,
        province,
        country,
        covered,
        semiCovered,
        uncovered
    } = req.query;

    try {
        let queryParams = {};

        if (street) queryParams[`address.${'street'}`] = street;
        if (number) queryParams[`address.${'number'}`] = number;
        if (floor) queryParams[`address.${'floor'}`] = floor;
        if (department) queryParams[`address.${'department'}`] = department;
        if (district) queryParams[`address.${'district'}`] = district;
        if (town) queryParams[`address.${'town'}`] = town;
        if (province) queryParams[`address.${'province'}`] = province;
        if (country) queryParams[`address.${'country'}`] = country;

        if (covered) queryParams[`squareMeters.${'covered'}`] = covered;
        if (semiCovered) queryParams[`squareMeters.${'semiCovered'}`] = semiCovered;
        if (uncovered) queryParams[`squareMeters.${'uncovered'}`] = uncovered;

        if (description) queryParams.description = description;
        if (associatedRealEstate) queryParams.associatedRealEstate = associatedRealEstate;
        //if (geolocation) queryParams.geolocation = geolocation;
        if (rooms) queryParams.rooms = rooms;
        if (bedrooms) queryParams.bedrooms = bedrooms;
        if (bathrooms) queryParams.bathrooms = bathrooms;
        if (hasTerrace) queryParams.hasTerrace = hasTerrace;
        if (hasBalcony) queryParams.hasBalcony = hasBalcony;
        if (garage) queryParams.garage = garage;
        if (hasStorageRoom) queryParams.hasStorageRoom = hasStorageRoom;
        if (age) queryParams.age = age;
        if (propertyType) queryParams.propertyType = propertyType;
        if (squareMeters) queryParams.squareMeters = squareMeters;
        if (frontOrBack) queryParams.frontOrBack = frontOrBack;
        if (orientation) queryParams.orientation = orientation;
        if (amenities) queryParams.amenities = amenities;
        if (photos) queryParams.photos = photos;
        if (video) queryParams.video = video;
        if (price) queryParams.price = price;
        if (expensesPrice) queryParams.expensesPrice = expensesPrice;
        if (status) queryParams.status = status;

        console.log(queryParams);

        const properties = await Properties.find(queryParams);
        res.status(200).json({ success: true, properties });
    }

    catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener propiedades: " + error });
    }
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