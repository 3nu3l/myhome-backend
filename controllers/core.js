const mongoose = require('mongoose');

exports.ping = async (req, res) => {
    /*  
        #swagger.description = API status
        #swagger.tags = ['Health API']
    */
    return res.status(200).json({ success: true, message: 'pong' });
};

exports.health = async (req, res) => {
    /*  
        #swagger.description = API dependency status
        #swagger.tags = ['Health API']
    */
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('Successfully connected to MongoDB.');
            res.status(200).send({ status: 'success', message: 'database ok' });
            mongoose.connection.close();
        })
        .catch(err => {
            console.log("Error connecting to MongoDB:", err);
            res.status(500).send({ status: 'fail', message: 'database ' + err.message });
        });
};