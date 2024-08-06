// const mongoose = require('mongoose');
// require('dotenv').config();

// const configureDB = async () => {
//     try {
//         const db = await mongoose.connect(process.env.MONGODB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to DB');
//     } catch (error) {
//         console.log('Error connecting to DB:', error);
//     }
// };

// module.exports = configureDB;
const mongoose = require('mongoose');
require('dotenv').config();

const configureDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URL;
        if (!dbURI) {
            throw new Error('MONGODB_URL environment variable is not set');
        }

        // Removed deprecated options
        await mongoose.connect(dbURI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
};

module.exports = configureDB;
