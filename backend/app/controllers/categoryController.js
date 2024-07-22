const Category = require('../models/categoryModel');
const Expense = require('../models/expenseModel')
const categoryController = {};

categoryController.addCategory = async (req, res) => {
    try {
        const body = req.body;
        const category = new Category(body);
        const categoryRes = await category.save();
        res.json({ message: 'Category added successfully', category: categoryRes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

categoryController.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

categoryController.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

categoryController.removeCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const associatedExpenses = await Expense.find({ category: categoryId }).populate('category', 'name');

        if (associatedExpenses.length > 0) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            return res.status(400).json({ error: `Cannot delete the category named "${category.name}" as it is associated with one or more expenses.` });
        }
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = categoryController;
