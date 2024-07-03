const Category = require('../models/categoryModel');
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
