import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const BASE_URL = 'http://localhost:3001'; // Adjust as necessary for your backend URL

export async function fetchWithAuth(endpoint, options = {}) {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    const request = {
      account: accounts[0],
      scopes: msalConfig.loginRequest.scopes
    };

    try {
      const response = await msalInstance.acquireTokenSilent(request);
      const accessToken = response.accessToken;
      const headers = new Headers(options.headers || {});
      headers.append('Authorization', `Bearer ${accessToken}`);

      const fetchOptions = {
        ...options,
        headers
      };

      return fetch(endpoint, fetchOptions);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch access token');
    }
  } else {
    throw new Error('No user account found');
  }
}

export const fetchMenu = async () => {
  const response = await fetch(`${BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  return await response.json();
};

export const fetchOrders = async (accessToken) => {
  const response = await fetchWithAuth(`${BASE_URL}/orders`, { });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return await response.json();
};
