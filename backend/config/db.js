const mongoose = require('mongoose');

const configureDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
};

module.exports = configureDB;
