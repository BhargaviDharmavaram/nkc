import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NKCOrdersSummary = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null); // Change initial state to null
    const [breakdown, setBreakdown] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(''); // State to store selected label dynamically

    const fetchTotalOrders = async (date, month, year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/get-total-orders-amount', {
                params: { date, month, year }
            });
            setTotalAmount(response.data.totalAmount);
            setBreakdown(response.data.breakdown);

            // Set the selected label dynamically based on what was selected
            if (date) {
                setSelectedLabel(`Total orders for Date - ${date}`);
            } else if (month) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'];
                setSelectedLabel(`Total orders for the Month - ${monthNames[month - 1]}`);
            } else if (year) {
                setSelectedLabel(`Total orders for the Year - ${year}`);
            }
        } catch (error) {
            console.error('Error fetching total orders:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedMonth(null);
        setSelectedYear(null);
        const formattedDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0] : null;
        fetchTotalOrders(formattedDate, null, null);
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setSelectedDate(null);
        setSelectedYear(null);
        const month = date ? date.getMonth() + 1 : null;
        const year = date ? date.getFullYear() : null;
        fetchTotalOrders(null, month, year);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        setSelectedDate(null);
        setSelectedMonth(null);
        const year = date ? date.getFullYear() : null;
        fetchTotalOrders(null, null, year);
    };

    return (
        <div>
            <h1>NKC Orders Summary</h1>
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
                    <p>Select a date, month, or year to see total orders.</p>
                </div>
            ) : (
                <div>
                    <h2>{selectedLabel}: {totalAmount}</h2>
                    <ul>
                        {breakdown.map(order => (
                            <li key={order._id}>
                                {new Date(order.date).toISOString().split('T')[0]}: {order.amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NKCOrdersSummary;
