import React from 'react';
import Paper from '@mui/material/Paper';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const EarningsCurrentMonthTotal = ({ earnings }) => {

    console.log(earnings, 'earnings-dialofg')

    return (
        <Paper sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: 2 }}>
            <List>
                {earnings.map((item) => (
                    <ListItem key={item._id}>
                        <ListItemText primary={`${item._id}: ${item.totalAmount}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default EarningsCurrentMonthTotal;
