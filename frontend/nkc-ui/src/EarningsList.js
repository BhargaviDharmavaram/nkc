import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography
} from '@mui/material';

const EarningsList = ({earnings}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, earnings.length - page * rowsPerPage);

    return(
        <div>
            <Typography variant="h4" gutterBottom>Earnings List - {earnings.length} </Typography>
            {earnings.length === 0 ? (
                <Typography variant="body1">
                    No earnings to display.
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {earnings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((earning, index) => (
                                    <TableRow key={earning._id}>
                                        <TableCell style={{ fontSize: '20px' }}>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{new Date(earning.date).toISOString().split('T')[0]}</TableCell>
                                        <TableCell style={{ fontSize: '20px' }}>{earning.amount}</TableCell>
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
                        count={earnings.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            )}
        </div>
    )
}

export default EarningsList