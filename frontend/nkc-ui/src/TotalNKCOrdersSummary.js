import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';

const NKCOrdersSummary = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [breakdown, setBreakdown] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState('');

    const fetchTotalOrders = async (date, month, year) => {
        try {
            const response = await axios.get('https://nkc-6nv4.onrender.com/api/get-total-orders-amount', {
                params: { date, month, year }
            });
            setTotalAmount(response.data.totalAmount);
            setBreakdown(response.data.breakdown);

            if (date) {
                setSelectedLabel(`Total orders for Date - ${date}`);
            } else if (month) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                setSelectedLabel(`Total orders for the Month - ${monthNames[month - 1]}`);
            } else if (year) {
                setSelectedLabel(`Total orders for the Year - ${year}`);
            }
        } catch (error) {
            console.error('Error fetching total orders:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedMonth(null);
        setSelectedYear(null);
        const formattedDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0] : null;
        fetchTotalOrders(formattedDate, null, null);
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setSelectedDate(null);
        setSelectedYear(null);
        const month = date ? date.getMonth() + 1 : null;
        const year = date ? date.getFullYear() : null;
        fetchTotalOrders(null, month, year);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        setSelectedDate(null);
        setSelectedMonth(null);
        const year = date ? date.getFullYear() : null;
        fetchTotalOrders(null, null, year);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <Typography variant="h4" gutterBottom>
                NKC Orders Summary
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" width="50%">
                <Box mb={2} width="100%">
                    <Typography variant="h6" gutterBottom>Select Date:</Typography>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        customInput={<TextField fullWidth variant="outlined" />}
                    />
                </Box>
                <Box mb={2} width="100%">
                    <Typography variant="h6" gutterBottom>Select Month:</Typography>
                    <DatePicker
                        selected={selectedMonth}
                        onChange={handleMonthChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        customInput={<TextField fullWidth variant="outlined" />}
                    />
                </Box>
                <Box mb={2} width="100%">
                    <Typography variant="h6" gutterBottom>Select Year:</Typography>
                    <DatePicker
                        selected={selectedYear}
                        onChange={handleYearChange}
                        dateFormat="yyyy"
                        showYearPicker
                        customInput={<TextField fullWidth variant="outlined" />}
                    />
                </Box>
            </Box>
            {totalAmount === null ? (
                <Typography variant="body1">Select a date, month, or year to see total orders.</Typography>
            ) : (
                <Box mt={3} width="100%" textAlign="center">
                    <Typography variant="h6">{selectedLabel}: {totalAmount}</Typography>
                    <List>
                        {breakdown.map(order => (
                            <ListItem key={order._id}>
                                <ListItemText primary={`${new Date(order.date).toISOString().split('T')[0]}: ${order.amount}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default NKCOrdersSummary;
