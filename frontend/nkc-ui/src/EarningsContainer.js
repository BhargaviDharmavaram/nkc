import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDailyEarnings from "./AddDailyEarnings";
import axios from "axios";
import Swal from 'sweetalert2';
import EarningsList from "./EarningsList";
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

const EarningsContainer = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [earnings, setEarnings] = useState([]);
    const [searchMonth, setSearchMonth] = useState(null); // Use null for DatePicker
    const [filteredEarnings, setFilteredEarnings] = useState([]);

    const fetchTotalEarningsForCurrentMonth = async (month, year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
                params: { month, year }
            });
            setTotalAmount(response.data.totalAmount);
        } catch (error) {
            console.error('Error fetching total earnings:', error);
        }
    };

    useEffect(() => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        fetchTotalEarningsForCurrentMonth(month, year);
    }, []);

    const addDailyEarnings = async (date, amount) => {
        try {
            const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            const response = await axios.post('http://localhost:3777/api/add-daily-earnings', {
                date: formattedDate,
                amount
            });
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `Earnings for the date ${formattedDate} - ${amount} added successfully!`
            });
            setTotalAmount(response.data.totalAmount);
            if (Array.isArray(response.data.dailyEarnings)) {
                setEarnings(response.data.dailyEarnings);
            } else {
                setEarnings(prevEarnings => [...prevEarnings, response.data.dailyEarnings]);
            }
        } catch (error) {
            console.error('Error adding daily earnings:', error);
        }
    };

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/get-earnings');
                if (Array.isArray(response.data.earnings)) {
                    setEarnings(response.data.earnings);
                } else {
                    setEarnings([response.data.earnings]);
                }
            } catch (error) {
                console.error('Error fetching earnings:', error);
            }
        };

        fetchEarnings();
    }, []);

    const removeEarning = async (earningId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: `Are you sure to remove the Earning?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3777/api/delete-earning/${earningId}`);
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    setEarnings(earnings.filter(earning => earning._id !== earningId));
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response.data.error 
                    });
                    console.error('Error removing earning:', error);
                }
            }
        });
    };

    const editEarning = async (earningId, currentAmount) => {
        const newAmount = prompt('Enter the new amount:', currentAmount);
        if (newAmount) {
            try {
                const updatedOrder = { amount: newAmount };
                const response = await axios.put(`http://localhost:3777/api/update-earning/${earningId}`, updatedOrder);
                Swal.fire({
                    icon: 'success',
                    title: response.data.message
                });
                const updatedEarnings = earnings.map(earning => {
                    if (earning._id === earningId) {
                        return { ...earning, amount: newAmount };
                    }
                    return earning;
                });
                setEarnings(updatedEarnings);
            } catch (error) {
                console.error('Error updating earning:', error);
            }
        }
    };

    const handleDateChange = (date) => {
        setSearchMonth(date);
    };

    useEffect(() => {
        if (searchMonth) {
            const month = searchMonth.getMonth() + 1;
            const year = searchMonth.getFullYear();
            fetchTotalEarningsForCurrentMonth(month, year);
            const filtered = earnings.filter(earning => {
                const earningDate = new Date(earning.date);
                return earningDate.getMonth() + 1 === month && earningDate.getFullYear() === year;
            });
            setFilteredEarnings(filtered);
        } else {
            setFilteredEarnings(earnings);
        }
    }, [searchMonth, earnings]);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Earnings Form
                </Typography>
                <AddDailyEarnings addDailyEarnings={addDailyEarnings} />
                <Typography variant="h6">Select Month:</Typography>
                <DatePicker
                    selected={searchMonth}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    customInput={<TextField variant="outlined" />}
                />
                <EarningsList 
                    earnings={filteredEarnings} // Use filteredEarnings
                    totalAmount={totalAmount} 
                    removeEarning={removeEarning} 
                    editEarning={editEarning} 
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
}

export default EarningsContainer;
