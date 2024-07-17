import React from 'react';

const NKCOrdersList = ({ orders, removeOrder, updateOrder }) => {

    return (
        <div>
            <h2>Total NKC Orders - {orders.length}</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{new Date(order.date).toISOString().split('T')[0]}</td>
                            <td>{order.amount}</td>
                            <td>
                                <button onClick={() => updateOrder(order._id, order)}>Edit</button>
                                <button onClick={() => removeOrder(order._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NKCOrdersList;
