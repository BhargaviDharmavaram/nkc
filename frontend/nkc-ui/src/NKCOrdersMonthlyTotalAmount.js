import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const NKCOrdersCurrentMonthTotal = ({ ordersAmount }) => {
    return (
        <Paper sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                Total NKC Orders for the Current Month: {ordersAmount}
            </Typography>
        </Paper>
    );
};

export default NKCOrdersCurrentMonthTotal;
