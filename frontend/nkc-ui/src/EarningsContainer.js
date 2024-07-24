import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDailyEarnings from "./AddDailyEarnings";
import axios from "axios";
import Swal from 'sweetalert2';
import EarningsList from "./EarningsList";
import {
    Container,
    Typography,
    Paper,
    Button,
    Box
} from '@mui/material';

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
            console.log(response.data)
            //setEarnings(response.data.dailyEarnings)
            setTotalAmount(response.data.totalAmount);
             // Check if dailyEarnings is an array or an object
             if (Array.isArray(response.data.dailyEarnings)) {
                setEarnings(response.data.dailyEarnings);
            } else {
                setEarnings(prevEarnings => [...prevEarnings, response.data.dailyEarnings]);
            }
        } catch (error) {
            console.error('Error adding daily earnings:', error);
        }
    };

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get('http://localhost:3777/api/get-earnings');
                console.log(response.data, 'daily-earnings-form-res')
                //setEarnings(response.data.earnings);
                // Ensure earnings is set to an array
                if (Array.isArray(response.data.earnings)) {
                    setEarnings(response.data.earnings);
                } else {
                    setEarnings([response.data.earnings]);
                }
            } catch (error) {
                console.error('Error fetching earnings:', error);
            }
        };

        fetchEarnings();
    }, []);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Earnings Form
                </Typography>
                <AddDailyEarnings addDailyEarnings={addDailyEarnings} />
                <EarningsList earnings={earnings} totalAmount={totalAmount}/>
                <Box marginTop={2}>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default EarningsContainer;
