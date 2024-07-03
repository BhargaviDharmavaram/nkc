import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseSummary = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null); // Change initial state to null
    const [breakdown, setBreakdown] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(''); // State to store selected label dynamically

    // useEffect(() => {
    //     // Fetch total expenses when the component mounts initially
    //     fetchTotalExpenses(null, null, null);
    // }, []);

    const fetchTotalExpenses = async (date, month, year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/total-expenses', {
                params: { date, month, year }
            });
            setTotalAmount(response.data.totalAmount);
            setBreakdown(response.data.breakdown);

            // Set the selected label dynamically based on what was selected
            if (date) {
                setSelectedLabel(`Total expenses for Date - ${date}`);
            } else if (month) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'];
                setSelectedLabel(`Total expenses for the Month - ${monthNames[month - 1]}`);
            } else if (year) {
                setSelectedLabel(`Total expenses for the Year - ${year}`);
            }
        } catch (error) {
            console.error('Error fetching total expenses:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedMonth(null);
        setSelectedYear(null);
        const formattedDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0] : null;
        fetchTotalExpenses(formattedDate, null, null);
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setSelectedDate(null);
        setSelectedYear(null);
        const month = date ? date.getMonth() + 1 : null;
        const year = date ? date.getFullYear() : null;
        fetchTotalExpenses(null, month, year);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        setSelectedDate(null);
        setSelectedMonth(null);
        const year = date ? date.getFullYear() : null;
        fetchTotalExpenses(null, null, year);
    };

    return (
        <div>
            <h1>Expense Summary</h1>
            <div>
                <label>Select Date: </label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <div>
                <label>Select Month: </label>
                <DatePicker
                    selected={selectedMonth}
                    onChange={handleMonthChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
            </div>
            <div>
                <label>Select Year: </label>
                <DatePicker
                    selected={selectedYear}
                    onChange={handleYearChange}
                    dateFormat="yyyy"
                    showYearPicker
                />
            </div>
            {totalAmount === null ? (
                <div>
                    <p>Select a date, month, or year to see total expenses.</p>
                </div>
            ) : (
                <div>
                    <h2>{selectedLabel}: {totalAmount}</h2>
                    <ul>
                        {breakdown.map(expense => (
                            <li key={expense._id}>
                                {expense.category.name}: {expense.totalAmount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExpenseSummary;
