

import React, { useState, useEffect } from 'react';

const FoodOrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        const fetchOrders = async () => {
         
            const response = await fetch("http://localhost:8080/food/food/all_orders");  
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, orderStatus: newStatus } : order
            )
        );
    };

    const renderOrderItems = (orderItems) => {
        return orderItems.map((orderItem) => (
            <li key={orderItem.foodItem.itemId}>
                {orderItem.foodItem.itemName} - Quantity: {orderItem.quantity} - Total Price: ${orderItem.totalPrice.toFixed(2)}
            </li>
        ));
    };

    return (
        <div>
            <h2>Food Orders (User-wise)</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <h3>User ID: {order.userId}</h3>
                            <p>Order Date: {new Date(order.orderedAt).toLocaleString()}</p>
                            <p>Total Price: ${order.priceSummary.toFixed(2)}</p>
                            <ul>{renderOrderItems(order.orders)}</ul>
                            <div>
                                <label htmlFor={`status-${order._id}`}>Order Status: </label>
                                <select
                                    id={`status-${order._id}`}
                                    value={order.orderStatus}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="Placed">Placed</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Declined">Declined</option>
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )
            )}
        </div>
    );
};

export default FoodOrderComponent;

