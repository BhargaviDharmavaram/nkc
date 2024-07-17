import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDailyEarnings from "./AddDailyEarnings";
import axios from "axios";
import Swal from 'sweetalert2';
import EarningsList from "./EarningsList";

const EarningsContainer = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [earnings, setEarnings] = useState([])

    const fetchTotalEarningsForCurrentMonth = async () => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // Months are 0-based in JavaScript Date object
        const year = currentDate.getFullYear();
        try {
            const response = await axios.get('http://localhost:3777/api/get-total-earnings-based-on-year-or-month', {
                params: { month, year }
            });
            setTotalAmount(response.data.totalAmount);
            console.log(response.data, 'dail-earnings-fetch-initially');
        } catch (error) {
            console.error('Error fetching total earnings:', error);
        }
    };

    useEffect(() => {
        // Fetch total earnings for the current month when the component mounts
        fetchTotalEarningsForCurrentMonth();
    }, []);

    const addDailyEarnings = async (date, amount) => {
        try {
            const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            const response = await axios.post('http://localhost:3777/api/add-daily-earnings', {
                date: formattedDate,
                amount
            });
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                text: `Earnings for the date ${formattedDate} - ${amount} added successfully!`, // Display the category's name from the server
            });
            setTotalAmount(response.data.totalAmount);
        } catch (error) {
            console.error('Error adding daily earnings:', error);
        }
    };

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/get-earnings');
                console.log(response.data, 'daily-earnings-form-res')
                setEarnings(response.data.earnings);
            } catch (error) {
                console.error('Error fetching earnings:', error);
            }
        };

        fetchEarnings();
    }, []);

    return (
        <div>
            <h1>Total Amount: {totalAmount}</h1>
            <AddDailyEarnings addDailyEarnings={addDailyEarnings} />
            <EarningsList earnings={earnings}/>
             
            <br />
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
}

export default EarningsContainer;
