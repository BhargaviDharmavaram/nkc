const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const authenticationsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    }
}, { timestamps: true });

authenticationsSchema.plugin(uniqueValidator);

const Authentication = mongoose.model('Authentication', authenticationsSchema);

module.exports = Authentication;
