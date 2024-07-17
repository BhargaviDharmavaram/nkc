import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AddExpense from "./AddExpense";
import ExpensesList from "./ExpensesList";
import DatePicker from "react-datepicker";

const ExpensesContainer = () => {
    const [expenses, setExpenses] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        // Fetch expenses, users, and categories from API
        const fetchExpenses = async () => {
            try {
                const expensesResponse = await axios.get('http://localhost:3777/api/get-expenses');
                setExpenses(expensesResponse.data.expenses);
                const usersResponse = await axios.get('http://localhost:3777/api/get-users');
                setUsers(usersResponse.data);
                const categoriesResponse = await axios.get('http://localhost:3777/api/get-categories');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchExpenses();
    }, []);

    useEffect(() => {
        // Filter expenses based on selected month
        if (selectedMonth) {
            const filtered = expenses.filter(expense => {
                const expenseDate = new Date(expense.dateTime);
                return expenseDate.getMonth() === selectedMonth.getMonth() &&
                       expenseDate.getFullYear() === selectedMonth.getFullYear();
            });
            setFilteredExpenses(filtered);
        } else {
            setFilteredExpenses(expenses);
        }
    }, [selectedMonth, expenses]);

    const addExpense = async (newExpenseData) => {
        try {
            const response = await axios.post('http://localhost:3777/api/add-expenses', newExpenseData);
            console.log(response.data,'res-while-adding-expense')
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `Expense added successfully!`
            });
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
                    const response = await axios.delete(`http://localhost:3777/api/delete-expenses/${expenseId}`);
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

    // const handleEditSubmit = async (updatedExpense) => {
    //     try {
    //         const response = await axios.put(`http://localhost:3777/api/update-expenses/${updatedExpense._id}`, updatedExpense);
    //         Swal.fire({
    //             icon: 'success',
    //             title: response.data.message
    //         });
    //         console.log(response.data, 'while-updating-expense-in container comp')
    //         setExpenses(expenses.map(expense => (expense._id === updatedExpense._id ? response.data.expense : expense)));
    //         setEditMode(false);
    //         setCurrentExpense(null);
    //     } catch (error) {
    //         console.error('Error updating expense:', error);
    //     }
    // };

    // const handleCancelEdit = () => {
    //     setEditMode(false);
    //     setCurrentExpense(null);
    // };
    const handleEditSubmit = async (updatedExpense) => {
        try {
            const response = await axios.put(`http://localhost:3777/api/update-expenses/${updatedExpense._id}`, updatedExpense);
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
    const handleMonthChange = (date) => {
        setSelectedMonth(date);
    };

    return (
        <div>
            <h2>Total Expenses - {expenses.length}</h2>
            <AddExpense
                addExpense={addExpense}
                users={users}
                categories={categories}
                isEditMode={editMode}
                currentExpense={currentExpense}
                onEditSubmit={handleEditSubmit}
                onCancelEdit={handleCancelEdit}
            />
            <div>
                <label>Select Month: </label>
                <DatePicker
                    selected={selectedMonth}
                    onChange={handleMonthChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
            </div>
            <ExpensesList
                expenses={selectedMonth ? filteredExpenses : expenses}
                selectedMonth={selectedMonth}
                removeExpense={removeExpense}
                editExpense={editExpense}
            />
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
}

export default ExpensesContainer;
