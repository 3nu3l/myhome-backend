const Favorites = require('../models/favorites');

exports.createFavoriteProperties = async (req, res) => {
    /*  
        #swagger.description = Create favorite properties for a user.
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                user: "1",
                properties: [
                    "1",
                    "2",
                    "3"
                ]
            }
        }
        #swagger.tags = ['Favorites']
    */
    const { user, properties } = req.body;

    try {
        const existingFavorites = await Favorites.findOne({ user });
        if (existingFavorites) {
            return res.status(409).json({ success: false, message: "Favorites for this user already exist, you need to use update endpoint" });
        }

        const newFavorites = new Favorites({ user, properties });
        await newFavorites.save();
        res.status(201).json({ success: true, message: "Favorites user created successfully", favorites: newFavorites });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating favorites" });
    }
};


exports.putFavoriteProperties = async (req, res) => {
    /*
        #swagger.description = Update favorite properties for a user.
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                user: "1",
                properties: [
                    "4",
                    "5",
                    "6"
                ]
            }
        }
        #swagger.tags = ['Favorites']
    */
    const { user, properties } = req.body;

    try {
        const updatedFavorites = await Favorites.findOneAndUpdate({ user }, { properties });
        if (!updatedFavorites) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "Favorites updated successfully", favorite: updatedFavorites });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error updating favorites" });
    }
};

exports.getFavoriteProperties = async (req, res) => {
    /*
        #swagger.description = Get favorite properties for a user.
        #swagger.parameters['id'] = {
            in: 'path',
            required: true
        }
        #swagger.tags = ['Favorites']
    */
    const userId = req.params.id;

    try {
        const favorites = await Favorites.findOne({ user: userId });
        if (!favorites) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, favorites: favorites });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error retrieving favorites" });
    }
};

exports.deleteFavoriteProperty = async (req, res) => {
    /*
        #swagger.description = Delete a specific favorite property for a user.
        #swagger.parameters['id'] = {
            in: 'path',
            required: true
        }
        #swagger.parameters['favoriteid'] = {
            in: 'path',
            required: true
        }
        #swagger.tags = ['Favorites']
    */
    const userId = req.params.id;
    const favoriteId = req.params['favoriteid'];

    try {
        const favorite = await Favorites.findOne({ user: userId });
        if (!favorite) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const index = favorite.properties.indexOf(favoriteId);
        if (index > -1) {
            favorite.properties.splice(index, 1);
        } else {
            return res.status(404).json({ success: false, message: "Favorite property not found" });
        }

        await favorite.save();
        res.status(202).json({ success: true, message: "Favorite property deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting favorite property" });
    }
};
