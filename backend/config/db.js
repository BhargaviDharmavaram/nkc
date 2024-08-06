const mongoose = require('mongoose');

const configureDB = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://dharamavarambhargavi:Riya2022@cluster0.lrtcqhk.mongodb.net/dharamavarambhargavi', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
};

module.exports = configureDB;
