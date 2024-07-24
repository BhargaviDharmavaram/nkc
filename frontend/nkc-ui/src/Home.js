// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Chart } from 'react-google-charts';
// import { Box, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, Button, DialogActions, CardHeader, Avatar } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import ExpensesSummary from "./TotalExpensesSummary";
// import NKCOrdersSummary from "./TotalNKCOrdersSummary";
// import EarningsSummary from "./TotalEarningsSummary";
// import NKCOrdersCurrentMonthTotal from "./NKCOrdersMonthlyTotalAmount";
// import EarningsCurrentMonthTotal from "./EarningsMonthlyTotalAmount";
// import ExpensesCurrentMonthTotal from "./ExpensesMonthlyTotalAmount";
// import DataVisualization from './SummaryReport';
// import { Link } from 'react-router-dom';
// import WeekendIcon from '@mui/icons-material/Weekend';
// import PersonIcon from '@mui/icons-material/Person';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// const useStyles = makeStyles({
//     card: {
//         position: 'relative',
//         overflow: 'visible',
//         cursor: 'pointer',
//         marginBottom: '1rem',
//         '&:hover': {
//             boxShadow: '0 20px 30px rgba(0, 0, 0, 0.12)',
//         },
//     },
//     cardHeader: {
//         color: '#d81b60',
//         paddingBottom: '0',
//     },
//     iconWrapper: {
//         position: 'absolute',
//         top: '-1.5rem',
//         left: '0.6rem',
//         width: '5rem',
//         height: '5rem',
//         borderRadius: '50%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#d81b60',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     },
//     icon: {
//         fontSize: '1.75rem',
//         color: '#d81b60',
//     },
//     cardFooter: {
//         padding: '0.75rem 1.5rem',
//     },
//     textPrimary: {
//         fontSize: '4rem',
//         color: '#d81b60',
//     },
//     textSecondary: {
//         color: '#ff9800',
//     },
//     textSuccess: {
//         color: '#4caf50',
//     },
//     textInfo: {
//         color: '#00bcd4',
//     },
// });

// const Home = () => {
//     const classes = useStyles();
//     const [totalEarningsAmount, setTotalEarningsAmount] = useState(0);
//     const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
//     const [expenses, setExpenses] = useState([]);
//     const [totalNKCOrdersAmount, setTotalNKCOrdersAmount] = useState(0);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [profitOrLoss, setProfitOrLoss] = useState(0);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);

    // const handleCardClick = () => {
    //     setIsDialogOpen(true);
    // };

    // const handleCloseDialog = () => {
    //     setIsDialogOpen(false);
    // };

//     const currentDate = new Date();
//     const options = { month: 'long' };
//     const currentMonth = new Intl.DateTimeFormat('en-US', options).format(currentDate);

//     useEffect(() => {
//         const fetchTotalEarningsForCurrentMonth = async () => {
//             const month = currentDate.getMonth() + 1;
//             const year = currentDate.getFullYear();
//             try {
//                 const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
//                     params: { month, year }
//                 });
//                 setTotalEarningsAmount(response.data.totalAmount);
//             } catch (error) {
//                 console.error('Error fetching total earnings:', error);
//             }
//         };
//         fetchTotalEarningsForCurrentMonth();
//     }, []);

//     useEffect(() => {
//         const fetchCurrentMonthExpensesTotal = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3777/api/current-month-total-expenses');
//                 const { totalAmount, breakdown } = response.data;
//                 setTotalExpensesAmount(totalAmount);
//                 setExpenses(breakdown);
//             } catch (error) {
//                 console.error('Error fetching current month total expenses:', error);
//             }
//         };
//         fetchCurrentMonthExpensesTotal();
//     }, []);

//     useEffect(() => {
//         const fetchTotalOrdersAmount = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3777/api/current-month-total-orders-amount');
//                 setTotalNKCOrdersAmount(response.data.totalAmount);
//             } catch (error) {
//                 console.error('Error fetching current month total orders amount:', error);
//             }
//         };
//         fetchTotalOrdersAmount();
//     }, []);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3777/api/get-users');
//                 console.log(response.data.length)
//                 setTotalUsers(response.data)
//             } catch (error) {
//                 console.error('Error fetching all users:', error);
//             }
//         };
//         fetchOrders();
//     }, []);

//     useEffect(() => {
//         const calculateProfitOrLoss = () => {
//             const totalExpenses = totalExpensesAmount + totalNKCOrdersAmount;
//             const profitOrLossAmount = totalEarningsAmount - totalExpenses;
//             setProfitOrLoss(profitOrLossAmount);
//         };
//         calculateProfitOrLoss();
//     }, [totalEarningsAmount, totalExpensesAmount, totalNKCOrdersAmount]);

//     const pieChartData = [
//         ['Category', 'Amount'],
//         ['Earnings', totalEarningsAmount],
//         ['Expenses', totalExpensesAmount],
//         ['NKC Orders', totalNKCOrdersAmount],
//     ];

//     const pieChartOptions = {
//         title: 'Current Month Financial Summary',
//         pieHole: 0.4,
//     };

//     const barChartData = [
//         ['Category', 'Amount', { role: 'style' }],
//         ['Earnings', totalEarningsAmount, 'color: blue'],
//         ['Expenses', totalExpensesAmount + totalNKCOrdersAmount, 'color: blue'],
//         ['Profit/Loss', profitOrLoss, profitOrLoss >= 0 ? 'color: green' : 'color: red'],
//     ];

//     const barChartOptions = {
//         title: 'Financial Breakdown',
//         chartArea: { width: '50%' },
//         hAxis: {
//             title: 'Amount',
//             minValue: 0,
//         },
//         vAxis: {
//             title: 'Category',
//         },
//     };

//     const hasData = totalEarningsAmount > 0 || totalExpensesAmount > 0 || totalNKCOrdersAmount > 0;

//     return (
//         <Box sx={{ display: 'flex' }}>
//             <Box>
//                 <Grid container spacing={-2}>
//                     <Grid container spacing={1}>
                        // <Grid item xs={12} md={3}>
                        //     <Card className={`${classes.card} ${classes.textPrimary}`} onClick={handleCardClick}>
                        //         <CardHeader
                        //             className={classes.cardHeader}
                        //             avatar={
                        //                 <Avatar className={classes.iconWrapper} fontSize="large">
                        //                     <AccountBalanceIcon className={classes.icon} fontSize="large" />
                        //                 </Avatar>
                        //             }
                        //             title={
                        //                 <Typography sx={{ fontSize: 25}} >
                        //                     Total Expenses
                        //                 </Typography>
                        //             }
                        //             subheader={
                        //                 <Typography sx={{ fontSize: 20}} >
                        //                     {currentMonth}
                        //                 </Typography>}
                        //         />
                        //         <CardContent>
                        //             <Typography variant="h4">Rs.{totalExpensesAmount}</Typography>
                        //         </CardContent>
                        //     </Card>
                        // </Grid>
                        // <Grid item xs={12} md={3}>
                        //     <Card className={`${classes.card} ${classes.textSecondary}`}>
                        //         <CardHeader
                        //             className={classes.cardHeader}
                        //             avatar={
                        //                 <Avatar className={classes.iconWrapper}>
                        //                     <AccountBalanceIcon className={classes.icon} />
                        //                 </Avatar>
                        //             }
                        //             title={
                        //                 <Typography sx={{ fontSize: 25}} >
                        //                     Total Earnings
                        //                 </Typography>
                        //             }
                        //             subheader={
                        //                 <Typography sx={{ fontSize: 20}} >
                        //                     {currentMonth}
                        //                 </Typography>}
                        //         />
                        //         <CardContent>
                        //             <Typography variant="h4">Rs.{totalEarningsAmount}</Typography>
                        //         </CardContent>
                        //     </Card>
                        // </Grid>
                        // <Grid item xs={12} md={3}>
                        //     <Card className={`${classes.card} ${classes.textSuccess}`}>
                        //         <CardHeader
                        //             className={classes.cardHeader}
                        //             avatar={
                        //                 <Avatar className={classes.iconWrapper}>
                        //                     <AccountBalanceIcon className={classes.icon} />
                        //                 </Avatar>
                        //             }
                        //             title={
                        //                 <Typography sx={{ fontSize: 25}} >
                        //                     NKC Orders
                        //                 </Typography>
                        //             }
                        //             subheader={
                        //                 <Typography sx={{ fontSize: 20}} >
                        //                     {currentMonth}
                        //                 </Typography>}
                        //         />
                        //         <CardContent>
                        //             <Typography variant="h4">Rs.{totalNKCOrdersAmount}</Typography>
                        //         </CardContent>
                        //     </Card>
                        // </Grid>
//                         <Grid item xs={12} md={3}>
//                             <Card className={`${classes.card} ${classes.textSuccess}`}>
//                                 <CardHeader
//                                     className={classes.cardHeader}
//                                     avatar={
//                                         <Avatar className={classes.iconWrapper}>
//                                             <PersonIcon className={classes.icon} />
//                                         </Avatar>
//                                     }
//                                     title={
//                                         <Typography sx={{ fontSize: 25}} >
//                                             Total Users
//                                         </Typography>
//                                     }
//                                     subheader={
//                                         <Typography sx={{ fontSize: 20}} >
//                                             {totalUsers.length}
//                                         </Typography>}
//                                 />
//                                 <CardContent>
//                                     <Typography variant="h4">Users: {totalUsers.length}</Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={12}>
                        // <Grid container spacing={2}>
                        //     <Grid item xs={12} md={6}>
                        //         <Typography variant="h4" sx={{ mb: 2 }}>Financial Summary - {currentMonth} </Typography>
                        //         {hasData ? (
                        //             <>
                        //                 <Chart
                        //                     chartType="PieChart"
                        //                     width="100%"
                        //                     height="400px"
                        //                     data={pieChartData}
                        //                     options={pieChartOptions}
                        //                 />
                        //             </>
                        //         ) : (
                        //             <h5>
                        //                 Can't avail current month's data due to its absence.
                        //                 <br />
                        //                 <li>Please add your Earnings by clicking here <Link to="/earnings">Earnings</Link></li>
                        //                 <li> Please add your Expenses by clicking here <Link to="/expenses">Expenses</Link></li>
                        //                 <li>Please add your NKC order by clicking here <Link to="/nkcorders">NKC Orders</Link></li>
                        //             </h5>
                        //         )}
                        //     </Grid>
                        //     <Grid item xs={12} md={6}>
                        //         {hasData && (
                        //             <Box>
                        //                 <Typography variant="h4" sx={{ mb: 2 }}>Financial Breakdown</Typography>
                        //                 {profitOrLoss > 0 ? (
                        //                     <Typography variant="body1" sx={{ color: 'green' }}>Profit: {profitOrLoss}</Typography>
                        //                 ) : profitOrLoss < 0 ? (
                        //                     <Typography variant="body1" sx={{ color: 'red' }}>Loss: {profitOrLoss}</Typography>
                        //                 ) : (
                        //                     <Typography variant="body1">No Profit/No Loss</Typography>
                        //                 )}
                        //                 <Chart
                        //                     chartType="BarChart"
                        //                     width="100%"
                        //                     height="400px"
                        //                     data={barChartData}
                        //                     options={barChartOptions}
                        //                 />
                        //             </Box>
                        //         )}
                        //     </Grid>
                        // </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Box sx={{ mt: 4 }}>
//                         <DataVisualization />
//                     </Box>
//                 </Grid>
//             </Box>
            // <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            //     <DialogTitle>Expenses Details</DialogTitle>
            //     <DialogContent>
            //         <ExpensesCurrentMonthTotal expenses={expenses} />
            //     </DialogContent>
            //     <DialogActions>
            //         <Button onClick={handleCloseDialog} color="primary">
            //             Close
            //         </Button>
            //     </DialogActions>
            // </Dialog>
//         </Box>
//     );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Box, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, Button, DialogActions, CardHeader, Avatar, TextField, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpensesCurrentMonthTotal from './ExpensesMonthlyTotalAmount'

const useStyles = makeStyles({
    card: {
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
        marginBottom: '1rem',
        '&:hover': {
            boxShadow: '0 20px 30px rgba(0, 0, 0, 0.12)',
        },
    },
    cardHeader: {
        color: '#d81b60',
        paddingBottom: '0',
    },
    iconWrapper: {
        position: 'absolute',
        top: '-0.5rem',
        left: '0.6rem',
        width: '5rem',
        height: '5rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d81b60',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    icon: {
        fontSize: '1.75rem',
        color: '#d81b60',
    },
    cardFooter: {
        padding: '0.75rem 1.5rem',
    },
    textPrimary: {
        fontSize: '4rem',
        color: '#d81b60',
    },
    textSecondary: {
        color: '#ff9800',
    },
    textSuccess: {
        color: '#4caf50',
    },
    textInfo: {
        color: '#00bcd4',
    },
});

const Home = () => {
    const classes = useStyles();
    const [totalEarningsAmount, setTotalEarningsAmount] = useState(0);
    const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
    const [totalNKCOrdersAmount, setTotalNKCOrdersAmount] = useState(0);
    const [profitOrLoss, setProfitOrLoss] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(null);
    const [expensesBreakdown, setExpensesBreakdown] = useState([]);
    const [ordersBreakdown, setOrdersBreakdown] = useState([]);
    const [earningsBreakdown, setEarningsBreakdown] = useState([]);
    const [monthlyExpensesBreakdown, setMonthlyExpensesBreakdown] = useState([]);
    const [monthlyEarningsBreakdown, setMonthlyEarningsBreakdown] = useState([]);
    const [monthlyOrdersBreakdown, setMonthlyOrdersBreakdown] = useState([]);
    const [monthlyExpensesAmountBreakdown, setMonthlyExpensesAmountBreakdown] = useState([])

    const currentDate = new Date();

    const handleCardClick = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchTotalEarningsForCurrentMonth = async () => {
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            try {
                const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
                    params: { month, year }
                });
                setTotalEarningsAmount(response.data.totalAmount);
            } catch (error) {
                console.error('Error fetching total earnings:', error);
            }
        };
        fetchTotalEarningsForCurrentMonth();
    }, []);

    useEffect(() => {
        const fetchCurrentMonthExpensesTotal = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/current-month-total-expenses');
                const { totalAmount, breakdown } = response.data;
                setTotalExpensesAmount(totalAmount);
                setExpensesBreakdown(breakdown)
            } catch (error) {
                console.error('Error fetching current month total expenses:', error);
            }
        };
        fetchCurrentMonthExpensesTotal();
    }, []);

    useEffect(() => {
        const fetchTotalOrdersAmount = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/current-month-total-orders-amount');
                setTotalNKCOrdersAmount(response.data.totalAmount);
            } catch (error) {
                console.error('Error fetching current month total orders amount:', error);
            }
        };
        fetchTotalOrdersAmount();
    }, []);

    useEffect(() => {
        const calculateProfitOrLoss = () => {
            const totalExpenses = totalExpensesAmount + totalNKCOrdersAmount;
            const profitOrLossAmount = totalEarningsAmount - totalExpenses;
            setProfitOrLoss(profitOrLossAmount);
        };
        calculateProfitOrLoss();
    }, [totalEarningsAmount, totalExpensesAmount, totalNKCOrdersAmount]);

    const fetchDataForMonth = async (month, year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/summary/month', {
                params: { month, year }
            });
            console.log('month-res', response.data);
            setTotalEarningsAmount(response.data.totalEarnings);
            setTotalExpensesAmount(response.data.totalExpenses);
            setTotalNKCOrdersAmount(response.data.totalOrders);
            console.log('expenses-brekdown-month',response.data.expensesBreakdown)
            setExpensesBreakdown(response.data.expensesBreakdown);
            setOrdersBreakdown(response.data.ordersBreakdown)
            setEarningsBreakdown(response.data.earningsBreakdown)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataForYear = async (year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/summary/year', {
                params: { year }
            });
            console.log('year-report',response.data)
            setTotalEarningsAmount(response.data.totalEarnings);
            setTotalExpensesAmount(response.data.totalExpenses);
            console.log('total-expenses-amount-year',response.data.totalExpenses)
            setTotalNKCOrdersAmount(response.data.totalOrders);
            setMonthlyEarningsBreakdown(response.data.monthlyBreakdown.earnings);
            setMonthlyExpensesBreakdown(response.data.monthlyBreakdown.expenses);
            setMonthlyOrdersBreakdown(response.data.monthlyBreakdown.orders);
            setMonthlyExpensesAmountBreakdown(response.data.monthlyBreakdown.expensesTotals)
            console.log('expenses-monthly total-per-year', response.data.monthlyBreakdown.expensesTotals)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            await fetchDataForMonth(month, year);
        };
        fetchInitialData();
    }, []);


    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setSelectedYear(null);
        const month = date ? date.getMonth() + 1 : null;
        const year = date ? date.getFullYear() : null;
        if (month && year) {
            fetchDataForMonth(month, year);
        }
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        setSelectedMonth(null);
        const year = date ? date.getFullYear() : null;
        if (year) {
            fetchDataForYear(year);
        }
    };

    const pieChartData = [
        ['Category', 'Amount'],
        ['Earnings', totalEarningsAmount],
        ['Expenses', totalExpensesAmount],
        ['NKC Orders', totalNKCOrdersAmount],
    ];

    const pieChartOptions = {
        title: 'Financial Summary',
        pieHole: 0.4,
    };

    const barChartData = [
        ['Category', 'Amount', { role: 'style' }],
        ['Earnings', totalEarningsAmount, 'color: blue'],
        ['Expenses', totalExpensesAmount + totalNKCOrdersAmount, 'color: blue'],
        ['Profit/Loss', profitOrLoss, profitOrLoss >= 0 ? 'color: green' : 'color: red'],
    ];

    const barChartOptions = {
        title: 'Financial Breakdown',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Amount',
            minValue: 0,
        },
        vAxis: {
            title: 'Category',
        },
    };

    const hasData = totalEarningsAmount > 0 || totalExpensesAmount > 0 || totalNKCOrdersAmount > 0;

    const ordersBarChartData = [
        ['Date', 'Total Amount'],
        ...ordersBreakdown.map(item => [item._id, item.totalAmount])
    ];

    const earningsBarChartData = [
        ['Date', 'Total Amount'],
        ...earningsBreakdown.map(item => [item._id, item.totalAmount])
    ];

    const expensesBarChartData = [['Category', 'Amount']].concat(
        expensesBreakdown.map((item) => [item.category.name, item.totalAmount])
    );

    const monthlyExpensesBarChartData = [['Category', 'Amount']].concat(
        monthlyExpensesBreakdown.map((item) => [
            item.category.name,
            item.totalAmount
        ])
    );

    const monthlyExpensesTotalAmountBarChartData = [['Month','Amount']].concat(
        monthlyExpensesAmountBreakdown.map((item) => [
            `${item._id.month}/${item._id.year}`,
            item.totalAmount
        ])
    )

    console.log('bargraph-expenses-monthly-total',monthlyExpensesTotalAmountBarChartData)

    const monthlyEarningsBarChartData = [['Month', 'Amount']].concat(
        monthlyEarningsBreakdown.map((item) => [
            `${item._id.month}/${item._id.year}`,
            item.totalAmount
        ])
    );

    const monthlyOrdersBarChartData = [['Month', 'Amount']].concat(
        monthlyOrdersBreakdown.map((item) => [
            `${item._id.month}/${item._id.year}`,
            item.totalAmount
        ])
    );

    return (
        <Box p={3}>
            <Box marginBottom={3}>
                <Typography variant="h4" gutterBottom>Financial Dashboard</Typography>
                <Typography variant="h6" gutterBottom>
                    Select Month and Year
                </Typography>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker
                            selected={selectedMonth}
                            onChange={handleMonthChange}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            placeholderText="Select Month"
                            customInput={<TextField label="Select Month" fullWidth />}
                        />
                    </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <DatePicker
                                selected={selectedYear}
                                onChange={handleYearChange}
                                dateFormat="yyyy"
                                showYearPicker
                                placeholderText="Select Year"
                                customInput={<TextField label="Select Year" fullWidth />}
                            />
                        </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                            <Card className={`${classes.card} ${classes.textPrimary}`} onClick={handleCardClick}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar className={classes.iconWrapper}>
                                            <AccountBalanceIcon className={classes.icon} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 25}} >
                                            Total Expenses
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography sx={{ fontSize: 20}} >
                                            
                                        </Typography>}
                                />
                                <CardContent>
                                    <Typography variant="h4">Rs.{totalExpensesAmount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className={`${classes.card} ${classes.textSecondary}`}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar className={classes.iconWrapper}>
                                            <AccountBalanceIcon className={classes.icon} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 25}} >
                                            Total Earnings
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography sx={{ fontSize: 20}} >
                                            
                                        </Typography>}
                                />
                                <CardContent>
                                    <Typography variant="h4">Rs.{totalEarningsAmount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className={`${classes.card} ${classes.textSuccess}`}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar className={classes.iconWrapper}>
                                            <AccountBalanceIcon className={classes.icon} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 25}} >
                                            NKC Orders
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography sx={{ fontSize: 20}} >
                                            
                                        </Typography>}
                                />
                                <CardContent>
                                    <Typography variant="h4">Rs.{totalNKCOrdersAmount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
            </Grid>
            <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h4" sx={{ mb: 2 }}>Financial Summary </Typography>
                                {hasData ? (
                                    <>
                                        <Chart
                                            chartType="PieChart"
                                            width="100%"
                                            height="400px"
                                            data={pieChartData}
                                            options={pieChartOptions}
                                        />
                                    </>
                                ) : (
                                    <h5>
                                        Can't avail current month's data due to its absence.
                                        <br />
                                        <li>Please add your Earnings by clicking here <Link to="/earnings">Earnings</Link></li>
                                        <li> Please add your Expenses by clicking here <Link to="/expenses">Expenses</Link></li>
                                        <li>Please add your NKC order by clicking here <Link to="/nkcorders">NKC Orders</Link></li>
                                    </h5>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {hasData && (
                                    <Box>
                                        <Typography variant="h4" sx={{ mb: 2 }}>Financial Breakdown</Typography>
                                        {profitOrLoss > 0 ? (
                                            <Typography variant="body1" sx={{ color: 'green' }}>Profit: {profitOrLoss}</Typography>
                                        ) : profitOrLoss < 0 ? (
                                            <Typography variant="body1" sx={{ color: 'red' }}>Loss: {profitOrLoss}</Typography>
                                        ) : (
                                            <Typography variant="body1">No Profit/No Loss</Typography>
                                        )}
                                        <Chart
                                            chartType="BarChart"
                                            width="100%"
                                            height="400px"
                                            data={barChartData}
                                            options={barChartOptions}
                                        />
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
            <Box mt={4}>
                {hasData ? (
                    <>
                        <Grid container spacing={3}>
                            {/* <Grid item xs={12} md={6}>
                                <Paper elevation={3}>
                                    <Chart
                                        chartType="PieChart"
                                        data={pieChartData}
                                        options={pieChartOptions}
                                        width="100%"
                                        height="400px"
                                    />
                                </Paper>
                            </Grid> */}
                            {/* <Grid item xs={12} md={6}>
                                <Paper elevation={3}>
                                {profitOrLoss > 0 ? (
                                            <Typography variant="body1" sx={{ color: 'green' }}>Profit: {profitOrLoss}</Typography>
                                        ) : profitOrLoss < 0 ? (
                                            <Typography variant="body1" sx={{ color: 'red' }}>Loss: {profitOrLoss}</Typography>
                                        ) : (
                                            <Typography variant="body1">No Profit/No Loss</Typography>
                                        )}
                                    <Chart
                                        chartType="BarChart"
                                        data={barChartData}
                                        options={barChartOptions}
                                        width="100%"
                                        height="400px"
                                    />
                                </Paper>
                            </Grid> */}
                            {selectedMonth && (
                                <>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={expensesBarChartData}
                                                options={{ title: 'Expenses Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={earningsBarChartData}
                                                options={{ title: 'Earnings Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={ordersBarChartData}
                                                options={{ title: 'Orders Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                </>
                            )}
                            {selectedYear && (
                                <>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={monthlyEarningsBarChartData}
                                                options={{ title: 'Monthly Earnings Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={monthlyExpensesBarChartData}
                                                options={{ title: 'Monthly Expenses categories list Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={monthlyExpensesTotalAmountBarChartData}
                                                options={{ title: 'Monthly Expenses Total Amount Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={monthlyOrdersBarChartData}
                                                options={{ title: 'Monthly Orders Breakdown' }}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </>
                ) : (
                    <Typography variant="body1" mt={2}>
                        No data available for the selected month/year.
                    </Typography>
                )}
            </Box>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Expenses Details</DialogTitle>
                <DialogContent>
                    <ExpensesCurrentMonthTotal expenses={expensesBreakdown} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Home;
