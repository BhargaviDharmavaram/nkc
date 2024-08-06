import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';

const AddExpense = (props) => {
    const { addExpense, users, categories, isEditMode, currentExpense, onEditSubmit, onCancelEdit } = props;

    const [dateTime, setDateTime] = useState(null);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [user, setUser] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (isEditMode && currentExpense) {
            setDateTime(new Date(currentExpense.dateTime));
            setCategory(currentExpense.category._id);
            setSubcategory(currentExpense.subcategory || '');
            setUser(currentExpense.user._id);
            setAmount(currentExpense.amount);
        } else {
            setDateTime(null);
            setCategory('');
            setSubcategory('');
            setUser('');
            setAmount('');
        }
    }, [isEditMode, currentExpense]);

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleSubcategoryChange = (e) => setSubcategory(e.target.value);
    const handleUserChange = (e) => setUser(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            dateTime: dateTime.toISOString(),
            month: dateTime.getMonth() + 1,
            year: dateTime.getFullYear(),
            category,
            subcategory,
            user,
            amount
        };

        try {
            if (isEditMode && currentExpense && currentExpense._id) {
                onEditSubmit({ ...formData, _id: currentExpense._id });
            } else {
                addExpense(formData);
            }

            // Reset form fields after submission
            setDateTime(null);
            setCategory('');
            setSubcategory('');
            setUser('');
            setAmount('');
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const handleCancel = () => {
        // Clear form fields
        setDateTime(null);
        setCategory('');
        setSubcategory('');
        setUser('');
        setAmount('');

        // Reset edit mode and current expense
        onCancelEdit();
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
            <Box component="form" onSubmit={handleFormSubmit} sx={{ textAlign: 'center', width: '80%' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '20px' }} mb={2}>Date and Time</Typography>
                <DatePicker
                    selected={dateTime}
                    onChange={date => setDateTime(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={<TextField fullWidth />}
                />
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Category</Typography>
                <Select
                    fullWidth
                    value={category}
                    onChange={handleCategoryChange}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value=""><em>Select Category</em></MenuItem>
                    {categories.map(cat => (
                        <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                    ))}
                </Select>
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Subcategory</Typography>
                <TextField
                    fullWidth
                    value={subcategory}
                    onChange={handleSubcategoryChange}
                    variant="outlined"
                    placeholder="Enter subcategory (e.g., rice, oils)"
                />
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>User</Typography>
                <Select
                    fullWidth
                    value={user}
                    onChange={handleUserChange}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value=""><em>Select User</em></MenuItem>
                    {users.map(user => (
                        <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                    ))}
                </Select>
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Amount</Typography>
                <TextField
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    variant="outlined"
                />
                <Box mt={3}>
                    {isEditMode ? (
                        <>
                            <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                                Update Expense
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" color="primary" type="submit">
                            Add Expense
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AddExpense;
