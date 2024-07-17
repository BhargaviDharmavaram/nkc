import React from 'react';

const ExpensesCurrentMonthTotal = (props) => {
    const {expenses, expensesAmount} = props
    return (
        <div>
            <h3>Total Expenses for the Current Month</h3>
            <p>Total Amount: {expensesAmount}</p>
            <ul>
                {expenses.map(item => (
                    <li key={item._id}>{item.category.name}: {item.totalAmount}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpensesCurrentMonthTotal;
