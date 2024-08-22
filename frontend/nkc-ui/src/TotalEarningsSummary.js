import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Typography, TextField } from '@mui/material';

const EarningsSummary = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState('');

    const fetchTotalEarnings = async (month, year) => {
        try {
            const response = await axios.get('https://nkc-6nv4.onrender.com/api/get-total-earnings-based-on-year-or-month', {
                params: { month, year }
            });
            setTotalAmount(response.data.totalAmount);

            if (month && year) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                setSelectedLabel(`Total earnings for ${monthNames[month - 1]} ${year}`);
            } else if (year) {
                setSelectedLabel(`Total earnings for the year ${year}`);
            } else {
                setSelectedLabel(`Total earnings`);
            }
             
        } catch (error) {
            console.error('Error fetching total earnings:', error);
        }
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setSelectedYear(null);
        const month = date ? date.getMonth() + 1 : null;
        const year = date ? date.getFullYear() : null;
        fetchTotalEarnings(month, year);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        const year = date ? date.getFullYear() : null;
        fetchTotalEarnings(null, year);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <Typography variant="h4" gutterBottom>
                Earnings Summary
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" width="50%">
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
                <Typography variant="body1">Select a month or year to see total earnings.</Typography>
            ) : (
                <Box mt={3} width="100%" textAlign="center">
                    <Typography variant="h6">{selectedLabel}: {totalAmount}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default EarningsSummary;
