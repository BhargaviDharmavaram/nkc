import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { List } from '@mui/material';

const EarningsCurrentMonthTotal = ({ earningsAmount }) => {

    // Function to get the month's name
    const getMonthName = (date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    // Function to format the day
    const formatDay = (day) => {
        if (day === 1) return `${day}st`;
        if (day === 2) return `${day}nd`;
        if (day === 3) return `${day}rd`;
        return `${day}th`;
    };

    const currentDate = new Date();
    const monthName = getMonthName(currentDate);
    const day = formatDay(currentDate.getDate()); // Today's date formatted

    // Get the first day of the current month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDay = formatDay(firstDayOfMonth.getDate());

    return (
        <Paper sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom>
                Total earnings for Current Month
            </Typography>
            <List>
                Current Month of {monthName} from {firstDay} to {day}: {earningsAmount}
            </List>
        </Paper>
    );
};

export default EarningsCurrentMonthTotal;
