const Expense = require('../models/expenseModel');
const DailyEarnings = require('../models/dailyEarningsModel');
const NKCProductsOrder = require('../models/nkcproductsOrdersModel');

const summaryController = {};

// Function to calculate total expenses and breakdown by category for a given period - month
const calculateExpenses = async (startDate, endDate) => {
    try {
        const expenses = await Expense.aggregate([
            {
                $match: {
                    dateTime: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            }
        ]);

        const totalAmount = expenses.reduce((acc, expense) => acc + expense.totalAmount, 0);

        return { totalAmount, breakdown: expenses };
    } catch (error) {
        console.error('Error calculating expenses:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total product orders and breakdown for a given period - year
const calculateProductOrdersForYear = async (startDate, endDate) => {
    try {
        const productOrders = await NKCProductsOrder.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const totalAmount = productOrders.reduce((acc, order) => acc + order.totalAmount, 0);

        return { totalAmount, breakdown: productOrders };
    } catch (error) {
        console.error('Error calculating product orders:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total product orders and detailed breakdown for each day of the month
const calculateMonthlyProductOrders = async (startDate, endDate) => {
    try {
        const dailyOrders = await NKCProductsOrder.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Format date as YYYY-MM-DD
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]);

        const totalAmount = dailyOrders.reduce((acc, order) => acc + order.totalAmount, 0);

        return { totalAmount, breakdown: dailyOrders };
    } catch (error) {
        console.error('Error calculating product orders:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total earnings and breakdown for a given period
const calculateTotalEarningsForYear = async (startDate, endDate) => {
    try {
        const earnings = await DailyEarnings.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const totalAmount = earnings.reduce((acc, earning) => acc + earning.totalAmount, 0);

        return { totalAmount, breakdown: earnings };
    } catch (error) {
        console.error('Error calculating total earnings:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate detailed breakdown of earnings for a specific month
const calculateMonthlyEarnings = async (startDate, endDate) => {
    try {
        const dailyEarnings = await DailyEarnings.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]);

        const totalAmount = dailyEarnings.reduce((acc, earning) => acc + earning.totalAmount, 0);

        return { totalAmount, breakdown: dailyEarnings };
    } catch (error) {
        console.error('Error calculating monthly earnings:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total expenses and breakdown by month for a given year
const calculateTotalExpensesForYear = async (startDate, endDate) => {
    try {
        const monthlyExpenses = await Expense.aggregate([
            {
                $match: {
                    dateTime: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$dateTime" },
                        month: { $month: "$dateTime" }
                    },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const totalAmount = monthlyExpenses.reduce((acc, expense) => acc + expense.totalAmount, 0);

        return { totalAmount, breakdown: monthlyExpenses };
    } catch (error) {
        console.error('Error calculating monthly expenses:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Controller to fetch data for expenses, earnings, and NKC orders for a specific year
summaryController.getDataForYear = async (req, res) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({ error: 'Year is required' });
        }

        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

        const [expensesData, productOrdersData, earningsData, totalamountExpensesData] = await Promise.all([
            calculateExpenses(startDate, endDate),
            calculateProductOrdersForYear(startDate, endDate),
            calculateTotalEarningsForYear(startDate, endDate),
            calculateTotalExpensesForYear(startDate, endDate) // To match with the monthly totals for expenses
        ]);

        return res.json({
            year: parseInt(year),
            totalEarnings: earningsData.totalAmount,
            totalExpenses: expensesData.totalAmount,
            totalOrders: productOrdersData.totalAmount,
            monthlyBreakdown: {
                earnings: earningsData.breakdown,
                expenses: expensesData.breakdown,
                orders: productOrdersData.breakdown,
                expensesTotals: totalamountExpensesData.breakdown
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to fetch data for expenses, earnings, and NKC orders for a specific month and year
summaryController.getDataForMonth = async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const [expensesData, productOrdersData, earningsData] = await Promise.all([
            calculateExpenses(startDate, endDate),
            calculateMonthlyProductOrders(startDate, endDate),
            calculateMonthlyEarnings(startDate, endDate)
        ]);

        return res.json({
            month: parseInt(month),
            year: parseInt(year),
            totalEarnings: earningsData.totalAmount,
            totalExpenses: expensesData.totalAmount,
            totalOrders: productOrdersData.totalAmount,
            expensesBreakdown: expensesData.breakdown,
            ordersBreakdown: productOrdersData.breakdown,
            earningsBreakdown: earningsData.breakdown
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = summaryController;
