import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Box, Typography, TextField, Grid, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DataVisualization = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [totalEarningsAmount, setTotalEarningsAmount] = useState(0);
    const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
    const [totalNKCOrdersAmount, setTotalNKCOrdersAmount] = useState(0);
    const [expensesBreakdown, setExpensesBreakdown] = useState([]);
    const [ordersBreakdown, setOrdersBreakdown] = useState([])
    const [earningsBreakdown, setEarningsBreakdown] = useState([])
    const [monthlyExpensesBreakdown, setMonthlyExpensesBreakdown] = useState([]);
    const [monthlyEarningsBreakdown, setMonthlyEarningsBreakdown] = useState([]);
    const [monthlyOrdersBreakdown, setMonthlyOrdersBreakdown] = useState([]);
    const [monthlyExpensesAmountBreakdown, setMonthlyExpensesAmountBreakdown] = useState([])

    const fetchDataForMonth = async (month, year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/summary/month', {
                params: { month, year }
            });
            setTotalEarningsAmount(response.data.totalEarnings);
            setTotalExpensesAmount(response.data.totalExpenses);
            setTotalNKCOrdersAmount(response.data.totalOrders);
            setExpensesBreakdown(response.data.expensesBreakdown);
            setOrdersBreakdown(response.data.ordersbreakdown)
            setEarningsBreakdown(response.data.earningsbreakdown)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataForYear = async (year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/summary/year', {
                params: { year }
            });
            console.log(response.data)
            setTotalEarningsAmount(response.data.totalEarnings);
            setTotalExpensesAmount(response.data.totalExpenses);
            setTotalNKCOrdersAmount(response.data.totalOrders);
            setMonthlyEarningsBreakdown(response.data.monthlyBreakdown.earnings);
            setMonthlyExpensesBreakdown(response.data.monthlyBreakdown.expenses);
            setMonthlyOrdersBreakdown(response.data.monthlyBreakdown.orders);
            setMonthlyExpensesAmountBreakdown(response.data.monthlyBreakdown.expensesTotals)
            console.log('expenses-montly total', response.data.monthlyBreakdown.expensesTotals)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    // month -earnings - when the user selects the month - july 2024 
    const ordersBarChartData = [
        ['Date', 'Total Amount'],
        ...ordersBreakdown.map(item => [item._id, item.totalAmount])
    ];

    const earningsBarChartData = [
        ['Date', 'Total Amount'],
        ...earningsBreakdown.map(item => [item._id, item.totalAmount])
    ];
    
    // month -expenses - when the user selects the month - july 2024 
    const expensesBarChartData = [['Category', 'Amount']].concat(
        expensesBreakdown.map((item) => [item.category.name, item.totalAmount])
    );
    // use selects the year - these are the montly breakdown in that year
    const monthlyExpensesBarChartData = [['Category', 'Amount']].concat(
        monthlyExpensesBreakdown.map((item) => [
            item.category.name,
            item.totalAmount
        ])
    );

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

    const barChartOptions = {
        title: 'Breakdown',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Amount',
            minValue: 0,
        },
        vAxis: {
            title: 'Category',
        },
    };

    return (
        <Box p={3} component={Paper}>
            <Typography variant="body1" mb={2}>
                Select a month or year to see the financial summary reports.
            </Typography>
            <Box component="form">
                <Box mb={2}>
                    <Typography variant="h6" gutterBottom>Select Month:</Typography>
                    <DatePicker
                        selected={selectedMonth}
                        onChange={handleMonthChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        customInput={<TextField fullWidth variant="outlined" />}
                    />
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" gutterBottom>Select Year:</Typography>
                    <DatePicker
                        selected={selectedYear}
                        onChange={handleYearChange}
                        dateFormat="yyyy"
                        showYearPicker
                        customInput={<TextField fullWidth variant="outlined" />}
                    />
                </Box>
            </Box>
            {(selectedMonth || selectedYear) && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ mb: 2 }}>Financial Summary</Typography>
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={pieChartData}
                            options={pieChartOptions}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {selectedYear && !selectedMonth && (
                            <>
                                <Typography variant="h4" sx={{ mb: 2 }}>Monthly Expenses Breakdown</Typography>
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    data={monthlyExpensesBarChartData}
                                    options={barChartOptions}
                                />
                                <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>Monthly Earnings Breakdown</Typography>
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    data={monthlyEarningsBarChartData}
                                    options={barChartOptions}
                                />
                                <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>Monthly Orders Breakdown</Typography>
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    data={monthlyOrdersBarChartData}
                                    options={barChartOptions}
                                />
                            </>
                        )}
                        {selectedMonth && (
                            <>
                                <Typography variant="h4" sx={{ mb: 2 }}>Expenses Breakdown</Typography>
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    data={expensesBarChartData}
                                    options={barChartOptions}
                                />
                                <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>NKC Orders Breakdown</Typography>
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    data={ordersBarChartData}
                                    options={barChartOptions}
                                />
                                <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>Earnings Breakdown</Typography>
                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    data={earningsBarChartData}
                                    options={barChartOptions}
                                />
                            </>
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default DataVisualization;
