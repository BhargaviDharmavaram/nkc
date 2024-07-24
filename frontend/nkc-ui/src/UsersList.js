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

const UsersList = (props) => {
    const { users, removeUser, editUser } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Users List - {users.length}</Typography>
            {users.length === 0 ? (
                <Typography variant="body1">
                    No users to display.
                </Typography>
            ) : (
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>S.No</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Name</TableCell>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                    <TableRow key={user._id}>
                                        <TableCell style={{ fontSize: '20px' }}>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{user.name}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => editUser(user._id, user.name)}
                                                style={{ marginRight: '5px' }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                size="small"
                                                onClick={() => removeUser(user._id,user.name)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
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

export default UsersList;
