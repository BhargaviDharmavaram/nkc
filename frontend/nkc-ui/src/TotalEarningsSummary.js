import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EarningsSummary = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null); // Change initial state to null
    const [selectedLabel, setSelectedLabel] = useState(''); // State to store selected label dynamically

    const fetchTotalEarnings = async (month, year) => {
        try {
            const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
                params: { month, year }
            });
            setTotalAmount(response.data.totalAmount);

            // Set the selected label dynamically based on what was selected
            if (month && year) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                setSelectedLabel(`Total earnings for ${monthNames[month - 1]} ${year}`);
            } else if (year) {
                setSelectedLabel(`Total earnings for the year ${year}`);
            } else {
                setSelectedLabel(`Total earnings`);
            }
             
        } catch (error) {
            console.error('Error fetching total earnings:', error);
        }
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
        setSelectedYear(null);
        const month = date ? date.getMonth() + 1 : null;
        const year = date ? date.getFullYear() : null;
        fetchTotalEarnings(month, year);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        const year = date ? date.getFullYear() : null;
        fetchTotalEarnings(null, year);
    };

    return (
        <div>
            <h1>Earnings Summary</h1>
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
                    <p>Select a month or year to see total earnings.</p>
                </div>
            ) : (
                <div>
                    <h2>{selectedLabel}: {totalAmount}</h2>
                </div>
            )}
        </div>
    );
};

export default EarningsSummary;
