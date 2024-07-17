const DailyEarnings = require('../models/dailyEarningsModel');

const dailyEarningsController = {};

// Add or update daily earnings
dailyEarningsController.addDailyEarnings = async (req, res) => {
    try {
        const { date: dateString, amount } = req.body;
        const date = new Date(dateString); // Convert date string to Date object
        let existingEntry = await DailyEarnings.findOne({ date });

        if (existingEntry) {
            // Update existing entry if date already exists
            existingEntry.amount = amount;
            await existingEntry.save();
        } else {
            // Create new entry if date does not exist
            const newDailyEarnings = new DailyEarnings({ date, amount });
            existingEntry = await newDailyEarnings.save(); // Save and get the newly created entry
        }

        // Calculate total earnings for the month of the added/updated entry
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

        const totalEarnings = await DailyEarnings.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        if (totalEarnings.length > 0) {
            res.json({
                message: 'Daily earnings added/updated successfully',
                dailyEarnings: existingEntry,
                totalAmount: totalEarnings[0].totalAmount
            });
        } else {
            res.json({
                message: 'Daily earnings added/updated successfully',
                dailyEarnings: existingEntry,
                totalAmount: 0
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

dailyEarningsController.getAllEarnings = async (req, res) =>{
    try {
        const earnings = await DailyEarnings.find()
        res.json({earnings : earnings})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get total earnings for a specific month and year
dailyEarningsController.getTotalEarningsBasedOnYearOrMonth = async (req, res) => {
    try {
        const { month, year } = req.query;
        let totalEarnings;

        if (month && year) {
            // Create date range for the selected month and year
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59, 999);

            totalEarnings = await DailyEarnings.aggregate([
                {
                    $match: {
                        date: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);
        } else if (year) {
            // Create date range for the selected year
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

            totalEarnings = await DailyEarnings.aggregate([
                {
                    $match: {
                        date: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);
        } else {
            // No year or month provided, get total earnings for all records
            totalEarnings = await DailyEarnings.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);
        }

        if (totalEarnings.length > 0) {
            res.json({ totalAmount: totalEarnings[0].totalAmount });
        } else {
            res.json({ totalAmount: 0 });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = dailyEarningsController;
