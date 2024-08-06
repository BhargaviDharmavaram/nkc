import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddDailyEarnings = ({ addDailyEarnings }) => {
    const [date, setDate] = useState(new Date());
    const [counterAmount, setCounterAmount] = useState('');
    const [teaCoffeeAmount, setTeaCoffeeAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = parseFloat(counterAmount) + parseFloat(teaCoffeeAmount);
        addDailyEarnings(date, amount);
        setCounterAmount('');
        setTeaCoffeeAmount('');
        setDate(new Date()); // Reset date to today's date
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
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Counter Amount</Typography>
                <TextField
                    fullWidth
                    type="number"
                    value={counterAmount}
                    onChange={(e) => setCounterAmount(e.target.value)}
                    variant="outlined"
                />
                <Typography variant="h6" mt={2} mb={2} style={{ fontWeight: 'bold', fontSize: '20px' }}>Tea/Coffee Amount</Typography>
                <TextField
                    fullWidth
                    type="number"
                    value={teaCoffeeAmount}
                    onChange={(e) => setTeaCoffeeAmount(e.target.value)}
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
