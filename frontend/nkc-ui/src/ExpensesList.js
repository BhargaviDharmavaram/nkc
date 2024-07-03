import React from 'react';

const ExpensesList = (props) => {
    const { expenses, removeExpense, editExpense, selectedMonth } = props;

    const handleRemove = (expenseId) => {
        removeExpense(expenseId);
    };

    const handleEdit = (expense) => {
        editExpense(expense);
    };

    return (
        <div>
            <h1>Expenses List</h1>
            {expenses.length === 0 ? (
                <p>No expenses to display {selectedMonth ? `for ${selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}` : ''}.</p>
            ) : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, i) => (
                            <tr key={expense._id}>
                                <td>{i + 1}</td>
                                <td>{new Date(expense.dateTime).toLocaleString()}</td>
                                <td>{expense.category.name}</td>
                                <td>{expense.user.name}</td>
                                <td>{expense.amount}</td>
                                <td>
                                    <button onClick={() => handleEdit(expense)}>Edit</button>
                                    <button onClick={() => handleRemove(expense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExpensesList;
