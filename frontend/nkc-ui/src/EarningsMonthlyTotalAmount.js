import React from 'react';

const EarningsCurrentMonthTotal = ({earningsAmount}) => {

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
            <h2>Total Earnings for the Month: {earningsAmount}</h2>
                Total earnings for the month of {monthName} from {firstDay} to {day}: {earningsAmount}
        </div>
    );
};

export default EarningsCurrentMonthTotal;
