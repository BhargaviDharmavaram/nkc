import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNKCOrdersForm = ({ addOrder }) => {
    const [date, setDate] = useState(new Date());
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
            <form onSubmit={handleFormSubmit} style={{ textAlign: 'center', width: '100%' }}>
                <label>Date</label> <br />
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                /> <br />

                <label>Amount</label> <br />
                <input type="number" value={amount} onChange={handleAmountChange} required /> <br />

                <input type='submit' value="Add Product Order" />
            </form>
        </div>
    );
};

export default AddNKCOrdersForm;
