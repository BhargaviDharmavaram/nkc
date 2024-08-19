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
    Grid,
    TextField
} from '@mui/material';

const NKCOrdersContainer = () => {
    const [orders, setOrders] = useState([]);
    const [searchMonth, setSearchMonth] = useState(null); // Use null for DatePicker
    const [searchDate, setSearchDate] = useState(null); // State for date
    const [searchType, setSearchType] = useState(''); // State for type
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:10000/api/get-productsOrders');
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
                    const response = await axios.delete(`http://localhost:10000/api/delete-productsOrders/${orderId}`);
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

    const editOrder = async (orderId, currentDate, currentAmount,currentOrderType) => {
        const newDate = prompt('Enter the new order date:', currentDate);
        const newAmount = prompt('Enter the new order amount:', currentAmount);
        const newOrderType = prompt('Enter the new order type placed:', currentOrderType)
        if (newDate && newAmount && newOrderType) {
            try {
                const updatedOrder = { date: newDate, amount: newAmount, type: newOrderType };
                const response = await axios.put(`http://localhost:10000/api/update-productsOrders/${orderId}`, updatedOrder);
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

    const handleMonthChange = (date) => {
        setSearchMonth(date);
        setSearchDate(null)
    };

    const handleDateChange = (date) => {
        setSearchDate(date);
        setSearchMonth(null)
    };

    const handleTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    useEffect(() => {
        let filtered = orders;

        if (searchMonth) {
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate.getMonth() === searchMonth.getMonth() &&
                       orderDate.getFullYear() === searchMonth.getFullYear();
            });
        }

        if (searchDate) {
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate.toDateString() === searchDate.toDateString();
            });
        }

        if (searchType) {
            filtered = filtered.filter(order => order.type.toLowerCase().includes(searchType.toLowerCase()));
        }

        setFilteredOrders(filtered);
    }, [searchMonth, searchDate, searchType, orders]);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    NKC Orders Form
                </Typography>
                <AddNKCOrdersForm addOrder={addOrder} />
                <Typography variant="h6" gutterBottom>
                    Search Orders
                </Typography>

                <Box marginTop={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Select Month:</Typography>
                        <DatePicker
                            selected={searchMonth}
                            onChange={handleMonthChange}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            customInput={<TextField variant="outlined" fullWidth />}
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Search by Date:</Typography>
                        <DatePicker
                            selected={searchDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            customInput={<TextField variant="outlined" fullWidth />}
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Search by Type of Orders Placed:</Typography>
                        <TextField
                            label="Search by Type"
                            value={searchType}
                            onChange={handleTypeChange}
                            variant="outlined"
                            fullWidth
                        />
                        </Grid>
                    </Grid>
                </Box>
                <NKCOrdersList 
                    orders={filteredOrders} 
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
