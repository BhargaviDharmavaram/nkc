const mongoose = require('mongoose');

const dailyEarningsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const DailyEarnings = mongoose.model('DailyEarnings', dailyEarningsSchema);

module.exports = DailyEarnings;
