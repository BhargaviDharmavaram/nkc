import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddDailyEarnings = ({ addDailyEarnings }) => {
    const [date, setDate] = useState(new Date()); // Initialize date state with today's date
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDailyEarnings(date, amount);
        setAmount('');
    };

    return (
        <div>
            <h2>Enter Daily Earnings Amount</h2>
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
        </div>
    );
};

export default AddDailyEarnings;
