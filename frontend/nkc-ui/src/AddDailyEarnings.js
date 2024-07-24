import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddDailyEarnings = ({ addDailyEarnings }) => {
    const [date, setDate] = useState(new Date()); // Initialize date state with today's date
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDailyEarnings(date, amount);
        setAmount('');
        setDate('')
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
            <form onSubmit={handleSubmit} style={{ textAlign: 'center', width: '80%' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '20px' }} mb={2}>Date</Typography>
                <DatePicker
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    dateFormat="yyyy-MM-dd"
                    customInput={<TextField fullWidth />}
                />
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Amount</Typography>
                <TextField
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outlined"
                />
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Add Daily Earnings
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddDailyEarnings;
