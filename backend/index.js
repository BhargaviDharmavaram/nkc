const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const userController = require('./app/controllers/userController')
const categoryController = require('./app/controllers/categoryController')
const expenseController = require('./app/controllers/expenseController')
const nkcProductsOrdersController = require('./app/controllers/nkcProductsOrdersController')
const dailyEarningsController = require('./app/controllers/dailyEarningController')
const summaryController = require('./app/controllers/summaryController')
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
app.get('/api/current-month-total-expenses', expenseController.getCurrentMonthTotalExpenses)

app.post('/api/add-productsOrders', nkcProductsOrdersController.addProductsOrder);
app.get('/api/get-productsOrders', nkcProductsOrdersController.getProductsOrders);
app.put('/api/update-productsOrders/:id', nkcProductsOrdersController.updateProductsOrders);
app.delete('/api/delete-productsOrders/:id', nkcProductsOrdersController.removeProductOrder);
app.get('/api/get-total-orders-amount',nkcProductsOrdersController.getTotalProductOrders);
app.get('/api/current-month-total-orders-amount', nkcProductsOrdersController.getCurrentMonthTotalNKCOrders)

// POST route to add daily earnings
app.post('/api/add-daily-earnings', dailyEarningsController.addDailyEarnings);
app.get('/api/get-earnings', dailyEarningsController.getAllEarnings)
// GET route to get total earnings
app.get('/api/get-total-earnings-based-on-year-or-month',dailyEarningsController.getTotalEarningsBasedOnYearOrMonth)


app.get('/api/summary/year', summaryController.getDataForYear);
app.get('/api/summary/month', summaryController.getDataForMonth);

const port = process.env.PORT || 3777;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});