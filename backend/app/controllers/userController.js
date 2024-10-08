const User = require('../models/userModel')
const Expense = require('../models/expenseModel')

const userController = {}
userController.addUser =  async (req, res) => {
    try{
        const body = req.body
        const users = new User(body)
        const userRes = await users.save()
        res.json({ message: 'User added successfully', user: userRes });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

userController.getUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(e){
        res.json(e.message)
    }
}

userController.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

userController.removeUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const associatedExpenses = await Expense.find({ user: userId });

        if (associatedExpenses.length > 0) {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(400).json({ error: `Cannot delete the user named "${user.name}"as the user is associated with one or more expenses.` });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = userController