const BASE_URL = 'http://localhost:3001'; // Adjust as necessary for your backend URL

export const fetchMenu = async () => {
  const response = await fetch(`${BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  return await response.json();
};

export const fetchOrders = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return await response.json();
};
