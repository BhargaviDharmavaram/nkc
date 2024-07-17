import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DailyEarningsForm = () => {
    const [date, setDate] = useState(new Date()); // Initialize date state with today's date
    const [amount, setAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    // Function to fetch total earnings for the current month
    const fetchTotalEarningsForCurrentMonth = async () => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // Months are 0-based in JavaScript Date object
        const year = currentDate.getFullYear();
        try {
            const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
                params: { month, year }
            });
            setTotalAmount(response.data.totalAmount);
            console.log(response.data,'dail-earnings-fetch-initally')
        } catch (error) {
            console.error('Error fetching total earnings:', error);
        }
    };

    useEffect(() => {
        // Fetch total earnings for the current month when the component mounts
        fetchTotalEarningsForCurrentMonth();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            const response = await axios.post('http://localhost:3777/api/add-daily-earnings', {
                date: formattedDate,
                amount
            });
            console.log(response.data,'dail-earnings-form-res')
            setTotalAmount(response.data.totalAmount);
            setAmount('')
        } catch (error) {
            console.error('Error adding daily earnings:', error);
        }
    };

    // Function to get the month's name
    const getMonthName = (date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    // Function to format the day
    const formatDay = (day) => {
        if (day === 1) return `${day}st`;
        if (day === 2) return `${day}nd`;
        if (day === 3) return `${day}rd`;
        return `${day}th`;
    };

    const currentDate = new Date();
    const monthName = getMonthName(currentDate);
    const day = formatDay(currentDate.getDate()); // Today's date formatted

     // Get the first day of the current month
     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
     const firstDay = formatDay(firstDayOfMonth.getDate());

    return (
        <div>
            <h1>Enter Daily Earnings Amount</h1>
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <DatePicker
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    dateFormat="yyyy-MM-dd"
                    required
                />

                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

                <button type="submit">Add Daily Earnings</button>
            </form>

            <div>
                <h2>Total Earnings for the Month:</h2>
                Total earnings for the month of {monthName} from {firstDay} to {day}: {totalAmount}
                <p>{totalAmount}</p>
            </div>
        </div>
    );
};

export default DailyEarningsForm;
