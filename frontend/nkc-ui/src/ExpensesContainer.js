import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AddExpense from "./AddExpense";
import ExpensesList from "./ExpensesList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Container,
    Typography,
    Paper,
    Button,
    Box,
    TextField, 
    Grid
} from '@mui/material';

const ExpensesContainer = () => {
    const [expenses, setExpenses] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchMonth, setSearchMonth] = useState(null)
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [categorySearch, setCategorySearch] = useState('');
    const [userSearch, setUserSearch] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expensesResponse = await axios.get('http://localhost:10000/api/get-expenses');
                setExpenses(expensesResponse.data.expenses);
                console.log(expensesResponse.data, 'expenses');
                const usersResponse = await axios.get('http://localhost:10000/api/get-users');
                setUsers(usersResponse.data);
                const categoriesResponse = await axios.get('http://localhost:10000/api/get-categories');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchExpenses();
    }, []);

    useEffect(() => {
        let filtered = expenses;

        if (searchMonth) {
            filtered = filtered.filter(expense => {
                const expenseMonth = new Date(expense.dateTime);
                return expenseMonth.getMonth() === searchMonth.getMonth() &&
                    expenseMonth.getFullYear() === searchMonth.getFullYear();
            });
        }

        if (selectedDate) {
            filtered = filtered.filter(expense => {
                const expenseDate = new Date(expense.dateTime);
                return expenseDate.toDateString() === selectedDate.toDateString();
            });
        }

        if (categorySearch) {
            filtered = filtered.filter(expense => expense.category && expense.category.name.toLowerCase().includes(categorySearch.toLowerCase()));
        }

        if (userSearch) {
            filtered = filtered.filter(expense => expense.user && expense.user.name.toLowerCase().includes(userSearch.toLowerCase()));
        }

        setFilteredExpenses(filtered);
    }, [selectedDate, categorySearch, userSearch, expenses, searchMonth]);

    const addExpense = async (newExpenseData) => {
        console.log(newExpenseData)
        try {
            const response = await axios.post('http://localhost:10000/api/add-expenses', newExpenseData);
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `Expense added successfully!`
            });
            console.log(response.data.expense, 'expenses-add')
            setExpenses([...expenses, response.data.expense]);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const removeExpense = async (expenseId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: `Are you sure to remove this expense?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:10000/api/delete-expenses/${expenseId}`);
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    setExpenses(expenses.filter(expense => expense._id !== expenseId));
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while removing the expense.'
                    });
                    console.error('Error removing expense:', error);
                }
            }
        });
    };

    const editExpense = (expense) => {
        setCurrentExpense(expense);
        setEditMode(true);
    };

    const handleEditSubmit = async (updatedExpense) => {
        try {
            const response = await axios.put(`http://localhost:10000/api/update-expenses/${updatedExpense._id}`, updatedExpense);
            Swal.fire({
                icon: 'success',
                title: response.data.message
            });
            setExpenses(expenses.map(expense => (expense._id === updatedExpense._id ? response.data.expense : expense)));
            setEditMode(false);
            setCurrentExpense(null);
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setCurrentExpense(null);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSearchMonth(null); 
    };
    const handleMonthChange = (date) => {
        setSearchMonth(date);
        setSelectedDate(null)
    };

    const handleCategorySearchChange = (event) => {
        setCategorySearch(event.target.value);
    };

    const handleUserSearchChange = (event) => {
        setUserSearch(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Expenses Form
                </Typography>
                <AddExpense
                    addExpense={addExpense}
                    users={users}
                    categories={categories}
                    isEditMode={editMode}
                    currentExpense={currentExpense}
                    onEditSubmit={handleEditSubmit}
                    onCancelEdit={handleCancelEdit}
                />
                <Box marginTop={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">
                                Select Date:
                            </Typography>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField variant="outlined" fullWidth />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Select Month:</Typography>
                        <DatePicker
                            selected={searchMonth}
                            onChange={handleMonthChange}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            customInput={<TextField variant="outlined" fullWidth />}
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">
                                Search Category:
                            </Typography>
                            <TextField
                                label="Search by Category"
                                variant="outlined"
                                value={categorySearch}
                                onChange={handleCategorySearchChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">
                                Search User:
                            </Typography>
                            <TextField
                                label="Search by User"
                                variant="outlined"
                                value={userSearch}
                                onChange={handleUserSearchChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box marginTop={2}>
                    <ExpensesList
                        expenses={filteredExpenses}
                        selectedMonth={selectedDate}
                        removeExpense={removeExpense}
                        editExpense={editExpense}
                    />
                </Box>
                <Box marginTop={2}>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ExpensesContainer;
