// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Chart } from 'react-google-charts';
// import ExpensesSummary from "./TotalExpensesSummary";
// import NKCOrdersSummary from "./TotalNKCOrdersSummary";
// import EarningsSummary from "./TotalEarningsSummary";
// import NKCOrdersCurrentMonthTotal from "./NKCOrdersMonthlyTotalAmount";
// import EarningsCurrentMonthTotal from "./EarningsMonthlyTotalAmount";
// import ExpensesCurrentMonthTotal from "./ExpensesMonthlyTotalAmount";

// const Home = () => {

//     const [totalEarningsAmount, setTotalEarningsAmount] = useState(0);
//     const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
//     const [expenses, setExpenses] = useState([]);
//     const [totalNKCOrdersAmount, setTotalNKCOrdersAmount] = useState(0);
//     const [profitOrLoss, setProfitOrLoss] = useState(0);

//     useEffect(() => {
//         const fetchTotalEarningsForCurrentMonth = async () => {
//             const currentDate = new Date();
//             const month = currentDate.getMonth() + 1; // Months are 0-based in JavaScript Date object
//             const year = currentDate.getFullYear();
//             try {
//                 const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
//                     params: { month, year }
//                 });
//                 setTotalEarningsAmount(response.data.totalAmount);
//                 console.log(response.data, 'daily-earnings-fetch-initially');
//             } catch (error) {
//                 console.error('Error fetching total earnings:', error);
//             }
//         };

//         fetchTotalEarningsForCurrentMonth();
//     }, []);

//     useEffect(() => {
//         const fetchCurrentMonthTotal = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3777/api/current-month-total-expenses');
//                 const { totalAmount, breakdown } = response.data;
//                 setTotalExpensesAmount(totalAmount);
//                 setExpenses(breakdown);
//             } catch (error) {
//                 console.error('Error fetching current month total expenses:', error);
//             }
//         };

//         fetchCurrentMonthTotal();
//     }, []);

//     useEffect(() => {
//         const fetchTotalAmount = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3777/api/current-month-total-orders-amount');
//                 setTotalNKCOrdersAmount(response.data.totalAmount);
//             } catch (error) {
//                 console.error('Error fetching current month total orders amount:', error);
//             }
//         };

//         fetchTotalAmount();
//     }, []);

//     useEffect(() => {
//         const calculateProfitOrLoss = () => {
//             const totalExpenses = totalExpensesAmount + totalNKCOrdersAmount;
//             const profitOrLossAmount = totalEarningsAmount - totalExpenses;
//             setProfitOrLoss(profitOrLossAmount);
//         };

//         calculateProfitOrLoss();
//     }, [totalEarningsAmount, totalExpensesAmount, totalNKCOrdersAmount]);

//     const data = [
//         ['Category', 'Amount'],
//         ['Earnings', totalEarningsAmount],
//         ['Expenses', totalExpensesAmount],
//         ['NKC Orders', totalNKCOrdersAmount],
//     ];

//     const options = {
//         title: 'Current Month Financial Summary',
//         pieHole: 0.4,
//     };

    // const TotalExpenses = `${totalExpensesAmount + totalNKCOrdersAmount}`
    // const result = `${totalEarningsAmount - TotalExpenses}`

//     return (
//         <div>
//             <Chart
//                 chartType="PieChart"
//                 width="100%"
//                 height="400px"
//                 data={data}
//                 options={options}
//             />
//             <EarningsSummary />
//             <EarningsCurrentMonthTotal earningsAmount={totalEarningsAmount} />
//             <ExpensesSummary />
//             <ExpensesCurrentMonthTotal expensesAmount={totalExpensesAmount} expenses={expenses} />
//             <NKCOrdersSummary />
//             <NKCOrdersCurrentMonthTotal nkcOrdersAmount={totalNKCOrdersAmount} />
//             <div>
//                 <h2>Financial Status:</h2>
//                 {profitOrLoss > 0 ? (
//                     <p>Profit: {profitOrLoss}</p>
//                 ) : profitOrLoss < 0 ? (
//                     <p>Loss: {profitOrLoss}</p>
//                 ) : (
//                     <p>No Profit/No Loss</p>
//                 )}
                // <h3>Expenses: {totalExpensesAmount}</h3>
                // <h3>Earnings: {totalEarningsAmount}</h3>
                // <h3>NKC Orders: {totalNKCOrdersAmount}</h3>
                // <h4>Total Expenses(Expenses + Nkc Orders): {TotalExpenses}</h4>
                // <h4>Result : {result}</h4>
//             </div>
//         </div>
//     );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import ExpensesSummary from "./TotalExpensesSummary";
import NKCOrdersSummary from "./TotalNKCOrdersSummary";
import EarningsSummary from "./TotalEarningsSummary";
import NKCOrdersCurrentMonthTotal from "./NKCOrdersMonthlyTotalAmount";
import EarningsCurrentMonthTotal from "./EarningsMonthlyTotalAmount";
import ExpensesCurrentMonthTotal from "./ExpensesMonthlyTotalAmount";

const Home = () => {
    const [totalEarningsAmount, setTotalEarningsAmount] = useState(0);
    const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [totalNKCOrdersAmount, setTotalNKCOrdersAmount] = useState(0);
    const [profitOrLoss, setProfitOrLoss] = useState(0);

    useEffect(() => {
        const fetchTotalEarningsForCurrentMonth = async () => {
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1; // Months are 0-based in JavaScript Date object
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
        const fetchCurrentMonthTotal = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/current-month-total-expenses');
                const { totalAmount, breakdown } = response.data;
                setTotalExpensesAmount(totalAmount);
                setExpenses(breakdown);
            } catch (error) {
                console.error('Error fetching current month total expenses:', error);
            }
        };

        fetchCurrentMonthTotal();
    }, []);

    useEffect(() => {
        const fetchTotalAmount = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/current-month-total-orders-amount');
                setTotalNKCOrdersAmount(response.data.totalAmount);
            } catch (error) {
                console.error('Error fetching current month total orders amount:', error);
            }
        };

        fetchTotalAmount();
    }, []);

    useEffect(() => {
        const calculateProfitOrLoss = () => {
            const totalExpenses = totalExpensesAmount + totalNKCOrdersAmount;
            const profitOrLossAmount = totalEarningsAmount - totalExpenses;
            setProfitOrLoss(profitOrLossAmount);
        };

        calculateProfitOrLoss();
    }, [totalEarningsAmount, totalExpensesAmount, totalNKCOrdersAmount]);

    const pieChartData = [
        ['Category', 'Amount'],
        ['Earnings', totalEarningsAmount],
        ['Expenses', totalExpensesAmount],
        ['NKC Orders', totalNKCOrdersAmount],
    ];

    const pieChartOptions = {
        title: 'Current Month Financial Summary',
        pieHole: 0.4,
    };

    const barChartData = [
        ['Category', 'Amount', { role: 'style' }],
        ['Earnings', totalEarningsAmount, 'color: blue'], // Customize color for earnings
        ['Expenses', totalExpensesAmount + totalNKCOrdersAmount, 'color: blue'], // Customize color for expenses
        ['Profit/Loss', profitOrLoss, profitOrLoss >= 0 ? 'color: green' : 'color: red'], // Color based on profit or loss
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
    const TotalExpenses = `${totalExpensesAmount + totalNKCOrdersAmount}`
    return (
        <div>
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={pieChartData}
                options={pieChartOptions}
            />
            <div>
                <h2>Financial Status:</h2>
                {profitOrLoss > 0 ? (
                    <p>Profit: {profitOrLoss}</p>
                ) : profitOrLoss < 0 ? (
                    <p>Loss: {profitOrLoss}</p>
                ) : (
                    <p>No Profit/No Loss</p>
                )}
                <h3>Expenses: {totalExpensesAmount}</h3>
                <h3>Earnings: {totalEarningsAmount}</h3>
                <h3>NKC Orders: {totalNKCOrdersAmount}</h3>
                <h4>Total Expenses(Expenses + Nkc Orders): {TotalExpenses}</h4>
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="300px"
                    data={barChartData}
                    options={barChartOptions}
                />
            </div>
            <EarningsSummary />
            <EarningsCurrentMonthTotal earningsAmount={totalEarningsAmount} />
            <ExpensesSummary />
            <ExpensesCurrentMonthTotal expensesAmount={totalExpensesAmount} expenses={expenses} />
            <NKCOrdersSummary />
            <NKCOrdersCurrentMonthTotal nkcOrdersAmount={totalNKCOrdersAmount} />
        </div>
    );
};

export default Home;
