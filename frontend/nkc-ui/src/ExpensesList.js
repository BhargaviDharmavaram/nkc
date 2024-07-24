// import React from 'react';

// const ExpensesList = (props) => {
//     const { expenses, removeExpense, editExpense, selectedMonth } = props;

//     const handleRemove = (expenseId) => {
//         removeExpense(expenseId);
//     };

//     const handleEdit = (expense) => {
//         editExpense(expense);
//     };

//     return (
//         <div>
//             <h1>Expenses List</h1>
//             {expenses.length === 0 ? (
//                 <p>No expenses to display {selectedMonth ? `for ${selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}` : ''}.</p>
//             ) : (
//                 <table border={1}>
//                     <thead>
//                         <tr>
//                             <th>S.No</th>
//                             <th>Date</th>
//                             <th>Category</th>
//                             <th>User</th>
//                             <th>Amount</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.map((expense, i) => (
//                             <tr key={expense._id}>
//                                 <td>{i + 1}</td>
//                                 <td>{new Date(expense.dateTime).toLocaleString()}</td>
//                                 <td>{expense.category.name}</td>
//                                 <td>{expense.user.name}</td>
//                                 <td>{expense.amount}</td>
//                                 <td>
//                                     <button onClick={() => handleEdit(expense)}>Edit</button>
//                                     <button onClick={() => handleRemove(expense._id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default ExpensesList;

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpensesList = ({ expenses, removeExpense, editExpense, selectedMonth }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, expenses.length - page * rowsPerPage);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Expenses List - {expenses.length} </Typography>
            {expenses.length === 0 ? (
                <Typography variant="body1">
                    No expenses to display {selectedMonth ? `for ${selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}` : ''}.
                </Typography>
            ) : (
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>S.No</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Date</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Category</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>User</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Amount</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense, i) => (
                                    <TableRow key={expense._id}>
                                        <TableCell style={{ fontSize: '20px' }}>{page * rowsPerPage + i + 1}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{new Date(expense.dateTime).toLocaleString()}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{expense.category && expense.category.name}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{expense.user && expense.user.name}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{expense.amount}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => editExpense(expense)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                size="small"
                                                onClick={() => removeExpense(expense._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={expenses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            )}
        </div>
    );
};

export default ExpensesList;
