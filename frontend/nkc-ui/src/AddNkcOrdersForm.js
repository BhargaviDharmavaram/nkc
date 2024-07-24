import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, TextField, Typography } from '@mui/material';

const AddNKCOrdersForm = ({ addOrder }) => {
    const [date, setDate] = useState();
    const [amount, setAmount] = useState('');

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            date: date.toISOString().split('T')[0], // Get date part only (YYYY-MM-DD)
            amount: amount
        };
        try {
            const response = await axios.post('http://localhost:3777/api/add-productsOrders', formData);
            console.log('Response from server:', response.data);
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: 'Product order added successfully!'
            });
            addOrder(response.data.productsOrder); // Update the orders list
            setDate(new Date()); // Reset date to current date
            setAmount('');
        } catch (error) {
            console.error('Error adding product order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the product order'
            });
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
            <form onSubmit={handleFormSubmit} style={{ textAlign: 'center', width: '80%' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '20px' }} mb={2}>Date</Typography>
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={<TextField fullWidth />}
                />
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Amount</Typography>
                <TextField
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    variant="outlined"
                />
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Add Product Order
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddNKCOrdersForm;
