const mongoose = require('mongoose');

module.exports = {
    connect: MONGODB_URI => {

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(MONGODB_URI);

        mongoose.connection.on('error', err => {
            console.log("Error connecting to MongoDB:", err);
            process.exit();
        });
    },

    close: () => {
        mongoose.connection.close();
    }
};