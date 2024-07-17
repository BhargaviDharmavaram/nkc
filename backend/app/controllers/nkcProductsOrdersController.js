const NKCProductsOrder = require('../models/nkcproductsOrdersModel')

const nkcProductsOrdersController = {};

nkcProductsOrdersController.addProductsOrder = async (req, res) => {
    try {
        const { date, amount } = req.body;
        const newProductsOrder = new NKCProductsOrder({ date, amount });
        const productsOrderRes = await newProductsOrder.save();
        res.json({ message: 'Product orders added successfully', productsOrder: productsOrderRes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

nkcProductsOrdersController.getProductsOrders = async (req, res) => {
    try {
        const productOrders = await NKCProductsOrder.find();
        res.json(productOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

nkcProductsOrdersController.updateProductsOrders = async (req, res) => {
    try {
        const productOrderId = req.params.id;
        const { date, amount } = req.body;
        const updatedProductOrders = await NKCProductsOrder.findByIdAndUpdate(productOrderId, { date, amount }, { new: true });
        if (!updatedProductOrders) {
            return res.status(404).json({ error: 'Product order is not found' });
        }
        res.json({ message: 'Product orders updated successfully', productOrder: updatedProductOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

nkcProductsOrdersController.removeProductOrder = async (req, res) => {
    try {
        const productOrderId = req.params.id;
        const productOrder = await NKCProductsOrder.findByIdAndDelete(productOrderId);
        if (!productOrder) {
            return res.status(404).json({ error: 'Product order is not found' });
        }
        res.json({ message: 'Product order removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to calculate total product orders and breakdown by date
const calculateProductOrdersForDate = async (date) => {
    try {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        const productOrders = await NKCProductsOrder.aggregate([
            {
                $match: {
                    date: { $gte: startOfDay, $lt: endOfDay }
                }
            }
        ]);

        const totalAmount = productOrders.reduce((acc, order) => acc + order.amount, 0);

        return { totalAmount, breakdown: productOrders };
    } catch (error) {
        console.error('Error calculating product orders for date:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total product orders and breakdown by month
const calculateProductOrdersForMonth = async (month, year) => {
    try {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

        const productOrders = await NKCProductsOrder.aggregate([
            {
                $match: {
                    date: { $gte: startOfMonth, $lt: endOfMonth }
                }
            }
        ]);

        const totalAmount = productOrders.reduce((acc, order) => acc + order.amount, 0);

        return { totalAmount, breakdown: productOrders };
    } catch (error) {
        console.error('Error calculating product orders for month:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Function to calculate total product orders and breakdown by year
const calculateProductOrdersForYear = async (year) => {
    try {
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

        const productOrders = await NKCProductsOrder.aggregate([
            {
                $match: {
                    date: { $gte: startOfYear, $lt: endOfYear }
                }
            }
        ]);

        const totalAmount = productOrders.reduce((acc, order) => acc + order.amount, 0);

        return { totalAmount, breakdown: productOrders };
    } catch (error) {
        console.error('Error calculating product orders for year:', error);
        return { totalAmount: 0, breakdown: [] };
    }
};

// Get total product orders for a specific date or month
nkcProductsOrdersController.getTotalProductOrders = async (req, res) => {
    try {
        const { date, month, year } = req.query;

        if (date) {
            const selectedDate = new Date(date);
            const { totalAmount, breakdown } = await calculateProductOrdersForDate(selectedDate);
            return res.json({ date: selectedDate, totalAmount, breakdown });
        }

        if (month && year) {
            const { totalAmount, breakdown } = await calculateProductOrdersForMonth(parseInt(month), parseInt(year));
            return res.json({ month: parseInt(month), year: parseInt(year), totalAmount, breakdown });
        }

        if (year) {
            const { totalAmount, breakdown } = await calculateProductOrdersForYear(parseInt(year));
            return res.json({ year: parseInt(year), totalAmount, breakdown });
        }

        return res.status(400).json({ error: 'Please provide a valid date or month and year' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get total NKC orders amount for the current month
nkcProductsOrdersController.getCurrentMonthTotalNKCOrders = async (req, res) => {
    try {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const { totalAmount } = await calculateProductOrdersForMonth(currentMonth, currentYear);

        res.json({ month: currentMonth, year: currentYear, totalAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = nkcProductsOrdersController;
