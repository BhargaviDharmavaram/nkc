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

const CategoriesList = ({ categories, removeCategory, editCategory }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, categories.length - page * rowsPerPage);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Categories List - {categories.length} </Typography>
            {categories.length === 0 ? (
                <Typography variant="body1">
                    No categories to display.
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
                            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, i) => (
                                <TableRow key={category._id}>
                                    <TableCell style={{ fontSize: '20px' }}>{page * rowsPerPage + i + 1}</TableCell>
                                    <TableCell style={{ fontSize: '20px' }}>{category.name}</TableCell>
                                    <TableCell style={{ fontSize: '20px' }}>
                                        <IconButton
                                            color="primary"
                                            size="small"
                                            onClick={() => editCategory(category._id, category.name)}
                                            style={{ marginRight: '5px' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={() => removeCategory(category._id, category.name)}
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
                count={categories.length}
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

export default CategoriesList;
