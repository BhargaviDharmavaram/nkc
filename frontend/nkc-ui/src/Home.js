import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Box, Typography, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, Button, DialogActions, CardHeader, Avatar, TextField, Paper } from '@mui/material';
//import { makeStyles, useTheme } from '@mui/styles';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpensesCurrentMonthTotal from './ExpensesMonthlyTotalAmount';
import EarningsCurrentMonthTotal from './EarningsMonthlyTotalAmount'

// const useStyles = makeStyles({
//     card: {
//       position: 'relative',
//       overflow: 'visible',
//       cursor: 'pointer',
//       marginBottom: '1rem',
//       '&:hover': {
//         boxShadow: '0 20px 30px rgba(0, 0, 0, 0.12)',
//       },
//     },
//     cardHeader: {
//       color: '#d81b60',
//       paddingBottom: '0',
//     },
//     iconWrapper: {
    //   position: 'absolute',
    //   top: '-0.2rem', // Adjusted to make the icon more visible
    //   left: '1rem',
    //   width: '4rem',
    //   height: '4rem',
    //   borderRadius: '50%',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#d81b60',
    //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     },
//     icon: {
//       fontSize: '2rem', // Increased font size for better visibility
//       color: '#fff', // Set color to white for better contrast
//     },
//     cardFooter: {
//       padding: '0.75rem 1.5rem',
//     },
//     textPrimary: {
//       fontSize: '4rem',
//       color: '#d81b60',
//     },
//     textSecondary: {
//       color: '#ff9800',
//     },
//     textSuccess: {
//       color: '#4caf50',
//     },
//     textInfo: {
//       color: '#00bcd4',
//     },
//   });

// Styled components using Emotion
const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    overflow: 'visible',
    cursor: 'pointer',
    marginBottom: '1rem',
    '&:hover': {
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.12)',
    },
}));

const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
    color: '#d81b60',
    paddingBottom: '0',
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
    position: 'absolute',
    top: '-0.2rem',
    left: '1rem',
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d81b60',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

const Icon = styled(AccountBalanceIcon)(({ theme }) => ({
    fontSize: '2rem',
    color: '#fff',
}));

const TextPrimary = styled(Typography)(({ theme }) => ({
    fontSize: '4rem',
    color: '#d81b60',
}));

// const TextSuccess = styled(Typography)(({ theme }) => ({
//     color: '#4caf50',
// }));

const Home = () => {
    //const classes = useStyles();
    const theme = useTheme();
    const [totalEarningsAmount, setTotalEarningsAmount] = useState(0);
    const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
    const [totalNKCOrdersAmount, setTotalNKCOrdersAmount] = useState(0);
    const [profitOrLoss, setProfitOrLoss] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(null);
    const [expensesBreakdown, setExpensesBreakdown] = useState([]);
    const [ordersBreakdown, setOrdersBreakdown] = useState([]);
    const [earningsBreakdown, setEarningsBreakdown] = useState([]);
    const [monthlyExpensesBreakdown, setMonthlyExpensesBreakdown] = useState([]);
    const [monthlyEarningsBreakdown, setMonthlyEarningsBreakdown] = useState([]);
    const [monthlyOrdersBreakdown, setMonthlyOrdersBreakdown] = useState([]);
    const [monthlyExpensesAmountBreakdown, setMonthlyExpensesAmountBreakdown] = useState([])

    const [isExpensesDialogOpen, setIsExpensesDialogOpen] = useState(false);
    const [isEarningsDialogOpen, setIsEarningsDialogOpen] = useState(false);

    //const currentDate = new Date();
    const currentDate = useMemo(() => new Date(), []); // Memoize the currentDate

    const handleExpensesCardClick = () => {
        setIsExpensesDialogOpen(true);
    };

    const handleExpensesCloseDialog = () => {
        setIsExpensesDialogOpen(false);
    };

    const handleEarningsCardClick = () => {
        setIsEarningsDialogOpen(true);
    };

    const handleEarningsCloseDialog = () => {
        setIsEarningsDialogOpen(false);
    };
    

    useEffect(() => {
        const fetchTotalEarningsForCurrentMonth = async () => {
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            try {
                const response = await axios.get('http://localhost:10000/api/get-total-earnings-based-on-year-or-month', {
                    params: { month, year }
                });
                setTotalEarningsAmount(response.data.totalAmount);
            } catch (error) {
                console.error('Error fetching total earnings:', error);
            }
        };
        fetchTotalEarningsForCurrentMonth();
    }, [currentDate]);

    useEffect(() => {
        const fetchCurrentMonthExpensesTotal = async () => {
            try {
                const response = await axios.get('http://localhost:10000/api/current-month-total-expenses');
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
                const response = await axios.get('http://localhost:10000/api/current-month-total-orders-amount');
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
            const response = await axios.get('http://localhost:10000/api/summary/month', {
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
            const response = await axios.get('http://localhost:10000/api/summary/year', {
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
    }, [currentDate]);


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
        backgroundColor: theme.palette.background.paper,
        legendTextStyle: { color: theme.palette.text.primary },
        titleTextStyle: { color: theme.palette.text.primary },
        pieSliceTextStyle: { color: theme.palette.common.white },
        tooltipTextStyle: { color: theme.palette.text.primary },
        chartArea: { width: '100%', height: '75%' },
    };

    const barChartData = [
        ['Category', 'Amount', { role: 'style' }],
        ['Earnings', totalEarningsAmount, 'color: blue'],
        ['Expenses', totalExpensesAmount + totalNKCOrdersAmount, 'color: blue'],
        ['Profit/Loss', profitOrLoss, profitOrLoss >= 0 ? 'color: green' : 'color: red'],
    ];

    // const barChartOptions = {
    //     title: 'Financial Breakdown',
    //     backgroundColor: theme.palette.background.paper,
    //     legendTextStyle: { color: theme.palette.text.primary },
    //     titleTextStyle: { color: theme.palette.text.primary },
    //     chartArea: { width: '50%' },
    //     hAxis: {
    //         title: 'Amount',
    //         minValue: 0,
    //         textStyle: { color: theme.palette.text.primary },
    //         titleTextStyle: { color: theme.palette.text.primary },
    //     },
    //     vAxis: {
    //         title: 'Category',
    //         textStyle: { color: theme.palette.text.primary },
    //         titleTextStyle: { color: theme.palette.text.primary },
    //     },
    // };
    const createBarChartOptions = (title) => ({
        title: title,
        vAxis: {
            format: 'decimal',
            textStyle: {
                color: theme.palette.text.primary,
            },
            titleTextStyle: { color: theme.palette.text.primary },
        },
        hAxis: {
            textStyle: {
                color: theme.palette.text.primary,
            },
            titleTextStyle: { color: theme.palette.text.primary },
        },
        backgroundColor: theme.palette.background.paper,
        legendTextStyle: { color: theme.palette.text.primary },
        titleTextStyle: { color: theme.palette.text.primary },
    });
    

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

    const formatMonthYear = (date) => {
        if (!date) return '';
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    const formatHeading = () => {
        if (selectedMonth) {
            return `${formatMonthYear(selectedMonth)}`;
        } else if (selectedYear) {
            return `${selectedYear.getFullYear()}`;
        } else {
            return '';
        }
    };

    return (
        <Box p={3}>
            <Box marginBottom={3}>
                <Typography 
                    variant="h2" gutterBottom>
                        Financial Dashboard - {formatHeading()}
                </Typography>
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
                            {/* <Card className={`${classes.card} ${classes.textPrimary}`} onClick={handleExpensesCardClick}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar className={classes.iconWrapper}>
                                            <AccountBalanceIcon className={classes.icon} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 25, ml: 8}} >
                                            Total Expenses
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="h4">Rs.{totalExpensesAmount}</Typography>
                                </CardContent>
                            </Card> */}
                            <StyledCard onClick={handleExpensesCardClick}>
                        <CardHeaderStyled 
                            sx={{ fontSize: 35, ml: 12}}
                            title="Total Expenses" />
                        <IconWrapper>
                            <Icon />
                        </IconWrapper>
                        <CardContent>
                            <TextPrimary>{totalExpensesAmount}</TextPrimary>
                        </CardContent>
                    </StyledCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* <Card className={`${classes.card} ${classes.textPrimary}`} onClick={handleEarningsCardClick}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar className={classes.iconWrapper}>
                                            <AccountBalanceIcon className={classes.icon} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 25, ml: 8}} >
                                            Total Earnings
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="h4">Rs.{totalEarningsAmount}</Typography>
                                </CardContent>
                            </Card> */}
                            <StyledCard onClick={handleEarningsCardClick}>
                        <CardHeaderStyled 
                        sx={{ fontSize: 35, ml: 12}}
                        title="Total Earnings" />
                        <IconWrapper>
                            <Icon />
                        </IconWrapper>
                        <CardContent>
                            <TextPrimary>{totalEarningsAmount}</TextPrimary>
                        </CardContent>
                    </StyledCard>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* <Card className={`${classes.card} ${classes.textSuccess}`}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar className={classes.iconWrapper}>
                                            <AccountBalanceIcon className={classes.icon} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 25, ml: 8}} >
                                            NKC Orders
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="h4">Rs.{totalNKCOrdersAmount}</Typography>
                                </CardContent>
                            </Card> */}
                            <StyledCard>
                        <CardHeaderStyled 
                        sx={{ fontSize: 35, ml: 12}}
                        title="NKC Orders" />
                        <IconWrapper>
                            <Icon />
                        </IconWrapper>
                        <CardContent>
                            <TextPrimary>{totalNKCOrdersAmount}</TextPrimary>
                        </CardContent>
                    </StyledCard>
                        </Grid>
            </Grid>
            <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h4" sx={{ mb: 2 }}>Financial Summary </Typography>
                                {hasData ? (
                                    <>
                                        <Paper elevation={3}>
                                        <Chart
                                            chartType="PieChart"
                                            width="100%"
                                            height="400px"
                                            data={pieChartData}
                                            options={pieChartOptions}
                                        />
                                        </Paper>
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
                                    <Box mt={2}>
                                        {profitOrLoss > 0 ? (
                                            <Typography variant="h4" sx={{ color: 'green' }}>Profit: {profitOrLoss}</Typography>
                                        ) : profitOrLoss < 0 ? (
                                            <Typography variant="h4" sx={{ color: 'red' }}>Loss: {profitOrLoss}</Typography>
                                        ) : (
                                            <Typography variant="h4">No Profit/No Loss</Typography>
                                        )}
                                        <Paper elevation={3}>
                                        <Chart
                                            chartType="BarChart"
                                            width="100%"
                                            height="400px"
                                            data={barChartData}
                                            options={createBarChartOptions('Financial Summary')}
                                        />
                                        </Paper>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
            <Box mt={4}>
                {hasData ? (
                    <>
                        <Grid container spacing={3}>
                            {selectedMonth && (
                                <>
                                    {expensesBreakdown.length > 0 && <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={expensesBarChartData}
                                                options={createBarChartOptions('Expenses Breakdown')}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    }
                                    {earningsBreakdown.length > 0 &&
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={earningsBarChartData}
                                                options={createBarChartOptions('Earnings Breakdown' )}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    }
                                    {ordersBreakdown.length > 0 && 
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={3}>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={ordersBarChartData}
                                                options={createBarChartOptions('Orders Breakdown')}
                                                width="100%"
                                                height="400px"
                                            />
                                        </Paper>
                                    </Grid>
                                    }
                                </>
                            )}
                            {selectedYear && (
                                <>
                                    {monthlyEarningsBreakdown.length>0 &&
                                        <Grid item xs={12} md={6}>
                                            <Paper elevation={3}>
                                                <Chart
                                                    chartType="ColumnChart"
                                                    data={monthlyEarningsBarChartData}
                                                    options={createBarChartOptions('Monthly Earnings Breakdown')}
                                                    width="100%"
                                                    height="400px"
                                                />
                                            </Paper>
                                        </Grid>
                                    }
                                    {monthlyExpensesBreakdown.length>0 && 
                                        <Grid item xs={12} md={6}>
                                            <Paper elevation={3}>
                                                <Chart
                                                    chartType="ColumnChart"
                                                    data={monthlyExpensesBarChartData}
                                                    options={createBarChartOptions('Monthly Expenses categories list Breakdown')}
                                                    width="100%"
                                                    height="400px"
                                                />
                                            </Paper>
                                        </Grid>
                                    }
                                    {monthlyExpensesAmountBreakdown.length > 0 && 
                                        <Grid item xs={12} md={6}>
                                            <Paper elevation={3}>
                                                <Chart
                                                    chartType="ColumnChart"
                                                    data={monthlyExpensesTotalAmountBarChartData}
                                                    options={createBarChartOptions('Monthly Expenses Total Amount Breakdown')}
                                                    width="100%"
                                                    height="400px"
                                                />
                                            </Paper>
                                        </Grid>
                                    }
                                    {monthlyOrdersBreakdown.length > 0 &&
                                        <Grid item xs={12} md={6}>
                                            <Paper elevation={3}>
                                                <Chart
                                                    chartType="ColumnChart"
                                                    data={monthlyOrdersBarChartData}
                                                    options={createBarChartOptions('Monthly Orders Breakdown')}
                                                    width="100%"
                                                    height="400px"
                                                />
                                            </Paper>
                                        </Grid>
                                    }
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
            <Dialog open={isExpensesDialogOpen} onClose={handleExpensesCloseDialog}>
                <DialogTitle>Expenses Details</DialogTitle>
                <DialogContent>
                    <ExpensesCurrentMonthTotal expenses={expensesBreakdown} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleExpensesCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isEarningsDialogOpen} onClose={handleEarningsCloseDialog}>
                <DialogTitle>Earnings Details</DialogTitle>
                <DialogContent>
                    <EarningsCurrentMonthTotal earnings={earningsBreakdown} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEarningsCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Home;


