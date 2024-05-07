export const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID", // This is the Application (client) ID from Azure portal
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace YOUR_TENANT_ID with your Azure AD tenant ID
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your app caches token data
        storeAuthStateInCookie: true, // Set to true to improve user experience on IE11 or if using Safari
    }
};

export const loginRequest = {
   scopes: ["User.Read"] // This can be adjusted to the permissions your app requires
};
