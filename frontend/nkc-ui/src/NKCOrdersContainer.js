import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AddNKCOrdersForm from "./AddNkcOrdersForm";
import NKCOrdersList from "./NKCOrdersList";

const NKCOrdersContainer = () => {
    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:3777/api/get-productsOrders')
            .then((res) => {
                console.log("orders", res.data); // array of objects
                setOrders(res.data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    
    const addOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    };

    const removeOrder = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:3777/api/delete-productsOrders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message
            });
        } catch (error) {
            console.error('Error removing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while removing the product order'
            });
        }
    };

    const updateOrder = async (orderId, updatedOrder) => {
        try {
            const response = await axios.put(`http://localhost:3777/api/update-productsOrders/${orderId}`, updatedOrder);
            const updatedOrders = orders.map(order => {
                if (order._id === orderId) {
                    return response.data.productOrder;
                }
                return order;
            });
            setOrders(updatedOrders);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product order updated successfully'
            });
        } catch (error) {
            console.error('Error updating order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the product order'
            });
        }
    };

    return (
        <div>
            <h2>Total NKC Orders - {orders.length}</h2>
            <AddNKCOrdersForm addOrder={addOrder} />
            <NKCOrdersList orders={orders} removeOrder={removeOrder} updateOrder={updateOrder}/>
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
};

export default NKCOrdersContainer;
