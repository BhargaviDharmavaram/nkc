import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AddNKCOrdersForm from "./AddNkcOrdersForm";
import NKCOrdersList from "./NKCOrdersList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Container,
    Typography,
    Paper,
    Button,
    Box,
    TextField
} from '@mui/material';

const NKCOrdersContainer = () => {
    const [orders, setOrders] = useState([]);
    const [searchMonth, setSearchMonth] = useState(null); // Use null for DatePicker
    const [filteredOrders, setFilteredOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/get-productsOrders');
                console.log("orders", response.data); // array of objects
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const addOrder = async (newOrder) => {
        setOrders([...orders, newOrder]);
    };

    const removeOrder = async (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: 'Are you sure to remove this order?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3777/api/delete-productsOrders/${orderId}`);
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    setOrders(orders.filter(order => order._id !== orderId));
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while removing the order.'
                    });
                    console.error('Error removing order:', error);
                }
            }
        });
    };

    const editOrder = async (orderId, currentDate, currentAmount) => {
        const newDate = prompt('Enter the new order date:', currentDate);
        const newAmount = prompt('Enter the new order amount:', currentAmount);
        if (newDate && newAmount) {
            try {
                const updatedOrder = { date: newDate, amount: newAmount };
                const response = await axios.put(`http://localhost:3777/api/update-productsOrders/${orderId}`, updatedOrder);
                const updatedOrders = orders.map(order => {
                    if (order._id === orderId) {
                        return response.data.productOrder;
                    }
                    return order;
                });
                setOrders(updatedOrders);
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                });
            } catch (error) {
                console.error('Error updating order:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while updating the order',
                });
            }
        }
    };

    const handleDateChange = (date) => {
        setSearchMonth(date);
    };

    useEffect(() => {
        if (searchMonth) {
            const filtered = orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate.getMonth() === searchMonth.getMonth() &&
                       orderDate.getFullYear() === searchMonth.getFullYear();
            });
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    }, [searchMonth, orders]);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    NKC Orders Form
                </Typography>
                <AddNKCOrdersForm addOrder={addOrder} />
                <Typography variant="h6">
                    Select Month:
                </Typography>
                <DatePicker
                    selected={searchMonth}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    customInput={<TextField variant="outlined" />}
                />
                <NKCOrdersList 
                    orders={searchMonth ? filteredOrders : orders} 
                    removeOrder={removeOrder} 
                    editOrder={editOrder} 
                />
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

export default NKCOrdersContainer;
