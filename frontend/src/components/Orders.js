// src/components/Orders.js
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { fetchOrders } from '../api/apiClient';
import { loginRequest } from '../authConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
        });
        const userData = await fetchOrders(response.accessToken);
        setOrders(userData);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchUserData();
  }, [instance, accounts]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>Order #{order.orderId}: {order.items.join(", ")} (Total: ${order.total.toFixed(2)})</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
