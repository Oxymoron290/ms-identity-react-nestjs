# React and NestJS example using the Microsoft Identity Platform

This application is a demonstration of integrating a [React frontend Single-page Application](https://react.dev/) and [NestJS backend WebAPI](https://nestjs.com/) with the [Microsoft Identity Platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-overview).

Built in Node v20.12.2

## Development Steps:

This part has already been done.

1. Scaffold Backend: `npx @nestjs/cli new backend`
1. Scaffold Frontend: `npx create-react-app frontend`
1. Install necessary packages
    1. Frontend: `npm install @azure/msal-react @azure/msal-browser`
    1. Backend: `npm install @nestjs/passport passport passport-azure-ad`
1. Wire up Backend
    1. Create `backend/src/auth/auth.module.ts` - Organizes all authentication related features.
    1. Create `backend/src/auth/auth.service.ts` - Provides a service to validate users, which can be extended based on your business logic.
    1. Create `backend/src/auth/azure.strategy.ts` -  Implements the OAuth bearer strategy using Azure AD. Here, you configure your Azure AD client details and the token validation process. The validate() function is used to authenticate and authorize the user each time a protected route is accessed.
    1. modify `backend/src/app.module.ts` - Import your AuthModule into the main application module.
1. Wire up Frontend
    1. Create `frontend/src/components/AuthenticatedComponent.js` - A component that displays content for authenticated users only.  Shows personalized content for authenticated users, leveraging the useAccount hook from MSAL to retrieve user details.
    1. Create `frontend/src/authConfig.js` - Configuration for MSAL, Sets up your Azure AD application's details and the scopes for which your application will request access.
    1. Modify `frontend/src/index.js` - Configure the application to use MSAL provider at a root level. Initializes MSAL's PublicClientApplication with the configuration and wraps the entire React app with MsalProvider to manage authentication state.
    1. Modify `frontend/src/App.js` - Handle user sign-in and display information. Manages login logic and displays different components based on whether the user is authenticated.

## Running the Application

In order to run the application, here are the steps you must follow:

### Step 1: Register your Application in Azure

1. Sign into the Azure Portal
    - Go to [Azure Portal](https://portal.azure.com) and sign in with your Microsoft Account.
1. Navigate to Microsoft Entra ID
    - Once you've logged in, find and select "Microsoft Entra ID" from the side navigation panel or the search bar.
1. Register a New Application
    - Inside Microsoft Entra ID, on the left side menu under the "Manage" section, click "App Registrations".
    - Click on "New registration" at the top.
    - Enter a name for your application.
    - Choose who can use the application. For testing, you can select "Accounts in this organizational directory only".
    - Under the Redirect URI, add the URI where your React app will be running plus any specific path needed for the auth response. For example, if your React app is running locally on port 3000, you might add `http://localhost:3000`
1. Obtain Application (Client) ID and Directory (Tenant) ID
    - After the application is registered, Azure will direct you to the application's overview page where you can find the Application (client) ID and Directory (tenant) ID. Note these down as they will be required in your application's configuration files.
1. Generate a Client Secret
    - Go to "Certificates & secrets" under Manage.
    - Click on "New client secret", provide a description, set an expiry period, and then click "Add".
    - Once the secret is created, make sure to copy it immediately, as you won't be able to see it again.

### Step 2: Configure Authentication and API Permissions

1. Add API Permissions
    - Go to "API permissions" under Manage.
    - Click on "Add a permission", then choose "Microsoft APIs" and select "Microsoft Graph".
    - Choose "Delegated permissions", and add permissions like "User.Read" which allows the app to sign in the user and read their profile.
    - Click "Add permissions" to save changes.
1. Grant Admin Consent for Default Permissions
    - Still in the "API permissions" page, click "Grant admin consent for [Your Organization]" to grant the necessary permissions.

### Step 3: Configure Redirect URIs

1. Set Redirect URIs
    - In the Azure portal, under the application registration, go to "Authentication".
    - Under "Platform configurations", click on "Add a platform".
    - Choose "Single-page application" and enter the redirect URI used in your React application (e.g., `http://localhost:3000`).

### Step 4: Update your Application with Azure Credentials

1. Update Your Backend Configuration
    - Use the Application (client) ID, Directory (tenant) ID, and the client secret in your NestJS backend configuration located at `backend/src/auth/azure.strategy.ts`, specifically in the Azure strategy setup.

1. Update Your Frontend Configuration
    - Update `frontend/src/authConfig.js` in your React application with the Application (client) ID and Directory (tenant) ID. Do **not** use the client secret in your frontend application!
