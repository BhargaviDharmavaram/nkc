// import React from 'react';

// const ExpensesCurrentMonthTotal = (props) => {
//     const {expenses, expensesAmount} = props
//     return (
//         <div>
//             <p>Total Amount: {expensesAmount}</p>
//             <ul>
//                 {expenses.map(item => (
//                     <li key={item._id}>{item.category.name}: {item.totalAmount}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ExpensesCurrentMonthTotal;
import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ExpensesCurrentMonthTotal = (props) => {
    const { expenses } = props;
    console.log('expenses', expenses)

    return (
        <Paper sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: 2 }}>
            <List>
                {expenses.map((item) => (
                    <ListItem key={item._id}>
                        <ListItemText primary={`${item.category.name}: ${item.totalAmount}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ExpensesCurrentMonthTotal;
