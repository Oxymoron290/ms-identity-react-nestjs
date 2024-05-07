// src/components/Menu.js
import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../api/apiClient';

const BakeryMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu().then(setMenuItems).catch(error => {
      setError(error.message);
    });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item.item}: ${item.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default BakeryMenu;
