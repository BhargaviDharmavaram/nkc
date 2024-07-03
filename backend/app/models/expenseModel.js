const mongoose = require('mongoose');
const Schema = mongoose.Schema

const expenseSchema = new mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    month: {
        type: Number, // 1-12 for January-December
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
