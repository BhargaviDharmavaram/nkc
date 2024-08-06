const Expense = require('../models/expenseModel')
//The expenseController is responsible for managing the allocation of expenses, detailing how much is given to each user and to which category the expense belongs.
const expenseController = {}

// Add a new expense
expenseController.addExpense = async (req, res) => {
    try {
        const { dateTime, month, year, category, user, amount, subcategory } = req.body;
        const expense = new Expense({
            dateTime,
            month,
            year,
            category,
            user,
            amount,
            subcategory 
        });
        const expenseRes = await expense.save();
        // Calculate total expenses for the month of the added expense
        const { totalAmount } = await calculateExpensesForMonth(parseInt(month), parseInt(year));

        // Populate the category and user details
        const populatedExpense = await Expense.findById(expenseRes._id).populate('category', 'name').populate('user', 'name');
        
        res.json({ message: 'Expense added successfully', expense: populatedExpense, totalAmount });

        // Populate the category and user details
        // const populatedExpense = await Expense.findById(expenseRes._id).populate('category', 'name').populate('user','name');
        // res.json({ message: 'Expense added successfully', expense: populatedExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all expenses
expenseController.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('category user');
        // const totalExpenses = await calculateDailyTotalExpenses();
        // console.log('total expense-get', totalExpenses)
        
        res.json({ expenses: expenses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an expense
expenseController.updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { dateTime, month, year, category, user, amount,subcategory  } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            expenseId,
            { dateTime, month, year, category, user, amount,subcategory  },
            { new: true }
        ).populate('category user');

        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        // Calculate total expenses for the month of the added expense
        const { totalAmount } = await calculateExpensesForMonth(parseInt(month), parseInt(year));

        res.json({ message: 'Expense updated successfully', expense: updatedExpense, totalAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove an expense
expenseController.removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const expense = await Expense.findByIdAndDelete(expenseId);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        res.json({ message: 'Expense removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to calculate total expenses and breakdown by category for a given date
const calculateExpensesForDate = async (date) => {
    try {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    dateTime: { $gte: startOfDay, $lt: endOfDay }
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
        console.error('Error calculating expenses for date:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total expenses and breakdown by category for a given month
const calculateExpensesForMonth = async (month, year) => {
    try {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    dateTime: { $gte: startOfMonth, $lt: endOfMonth }
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
        console.error('Error calculating expenses for month:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total expenses and breakdown by category for a given year
const calculateExpensesForYear = async (year) => {
    try {
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    dateTime: { $gte: startOfYear, $lt: endOfYear }
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
        console.error('Error calculating expenses for year:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Get total expenses for a specific date or month
expenseController.getTotalExpenses = async (req, res) => {
    try {
        const { date, month, year } = req.query;

        if (date) {
            const selectedDate = new Date(date);
            const { totalAmount, breakdown } = await calculateExpensesForDate(selectedDate);
            return res.json({ date: selectedDate, totalAmount, breakdown });
        }

        if (month && year) {
            const { totalAmount, breakdown } = await calculateExpensesForMonth(parseInt(month), parseInt(year));
            return res.json({ month: parseInt(month), year: parseInt(year), totalAmount, breakdown });
        }

        if (year) {
            const { totalAmount, breakdown } = await calculateExpensesForYear(parseInt(year));
            return res.json({ year: parseInt(year), totalAmount, breakdown });
        }

        return res.status(400).json({ error: 'Please provide a valid date or month and year' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//API endpoint to get total expenses for the current month
expenseController.getCurrentMonthTotalExpenses = async (req, res) => {
    try {
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // getMonth() is zero-based
        const currentYear = now.getFullYear();

        const { totalAmount, breakdown } = await calculateExpensesForMonth(currentMonth, currentYear);
        res.json({ month: currentMonth, year: currentYear, totalAmount, breakdown });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = expenseController;