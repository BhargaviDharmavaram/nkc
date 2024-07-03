const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const userController = require('./app/controllers/userController')
const categoryController = require('./app/controllers/categoryController')
const expenseController = require('./app/controllers/expenseController')
const app = express()
app.use(express.json())
app.use(cors())
configureDB()

app.post('/api/add-user' , userController.addUser)
app.get('/api/get-users', userController.getUsers)
app.put('/api/update-user/:id', userController.updateUser);
app.delete('/api/delete-user/:id', userController.removeUser)

app.post('/api/add-category' , categoryController.addCategory)
app.get('/api/get-categories', categoryController.getCategories)
app.put('/api/update-category/:id', categoryController.updateCategory);
app.delete('/api/delete-category/:id', categoryController.removeCategory)

app.post('/api/add-expenses', expenseController.addExpense);
app.get('/api/get-expenses', expenseController.getExpenses);
app.put('/api/update-expenses/:id', expenseController.updateExpense);
app.delete('/api/delete-expenses/:id', expenseController.removeExpense);
app.get('/api/total-expenses', expenseController.getTotalExpenses);

const port = 3777
app.listen(port,()=>{
    console.log('server is running in ', port)
})