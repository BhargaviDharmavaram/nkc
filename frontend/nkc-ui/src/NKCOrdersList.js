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

const NKCOrdersList = ({ orders, removeOrder, editOrder }) => {

    console.log(orders, 'orders-nkcorderlist-component')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

    return (
        <div>
            <Typography variant="h4">NKC Orders List - {orders.length} </Typography>
            {orders.length === 0 ? (
                <Typography variant="body1">
                    No orders to display.
                </Typography>
            ) : (
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>S.No</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Date</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Amount</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Type of Order</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                    <TableRow key={order._id}>
                                        <TableCell style={{ fontSize: '20px' }}>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{ order.date && new Date(order.date).toISOString().split('T')[0]}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{order.amount}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{order.type}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => editOrder(order._id, new Date(order.date).toISOString().split('T')[0], order.amount, order.type)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                size="small"
                                                onClick={() => removeOrder(order._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={orders.length}
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

export default NKCOrdersList;
