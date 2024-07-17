import React from 'react';

const NKCOrdersCurrentMonthTotal = ({nkcOrdersAmount}) => {

    return (
        <div>
            <h2>Total Orders for Current Month</h2>
            <p>Total Amount: {nkcOrdersAmount}</p>
        </div>
    );
};

export default NKCOrdersCurrentMonthTotal;
