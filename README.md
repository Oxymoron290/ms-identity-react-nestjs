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

In order to run the application, you must first decide on your a single application registration or separate application registration for your solution. The decision comes down to your future scope of this application. If your frontend react application and backend nestjs application will be tightly coupled where the frontend integrates moest every endpoint exposed by your backend, and your backend isn't doing anything advanced like scheduled tasks or background workers, then a Single application registration may be preferred. However if your Backend API is more complex, being consumed by many different clients and frontends, implements a background work or scheduler and performs actions on behalf of users without them being present, then a separate app registration might be preferrable.

### Option 1) Separate App Registration

1. Sign into the Azure Portal
    - Go to [Azure Portal](https://portal.azure.com) and sign in with your Microsoft Account.
1. Navigate to Microsoft Entra ID
    - Once you've logged in, find and select "Microsoft Entra ID" from the side navigation panel or the search bar.

#### Create app registration for Backend

In most cases, you do not need a Redirect URI for your backend's app registration unless the backend itself directly interacts with users for authentication purposes (such as redirecting users to log in). Typically, backends in such architectures:

- Validate tokens sent by the frontend, which does involve redirecting users or interacting with a user agent.
- Perform server-to-server communications under their credentials, which might require a client secret but no Redirect URI.

In our architecture, this is not the case, so a Redirect URI will not be needed for the Backend app registration. Our backend will mainly be validating access tokens. For this reason a Redirect URI is not necessary.

1. Register a New Application
    - Inside Microsoft Entra ID, on the left side menu under the "Manage" section, click "App Registrations".
    - Click on "New registration" at the top.
    - Enter a name for your application.
    - Choose who can use the application. For testing, you can select "Accounts in this organizational directory only".
1. Obtain Application (Client) ID and Directory (Tenant) ID
    - After the application is registered, Azure will direct you to the application's overview page where you can find the Application (client) ID and Directory (tenant) ID. Note these down as they will be required in your application's configuration files.
1. Generate a Client Secret
    - Go to "Certificates & secrets" under Manage.
    - Click on "New client secret", provide a description, set an expiry period, and then click "Add".
    - Once the secret is created, make sure to copy it immediately, as you won't be able to see it again.
1. Update Your Backend Configuration
    - Use the Application (client) ID, Directory (tenant) ID, and the client secret in your NestJS backend configuration located at `backend/src/auth/azure.strategy.ts`, specifically in the Azure strategy setup.

#### Create app registration for frontend

For a React Single Page Application (SPA), you typically do not use a Client Secret. Here's why:

- Security Concern: Client secrets cannot be securely stored in an SPA, as any code deployed to the client can be inspected by users. This exposes the secret to potential misuse.
- Recommended Flow: SPAs should use the OAuth 2.0 Authorization Code Flow with Proof Key for Code Exchange (PKCE). This flow does not require a client secret and is designed to ensure that only the authenticating client (your SPA) can exchange the authorization code for an access token.

For the React SPA, we will use the Authorization Code Flow with PKCE rather than the Implicit Flow. PKCE adds security during the authentication process and is recommended for applications like SPAs that run entirely in the user's browser.

To acheive this we will configure the OAuth settings in Azure without a client secret. Only use the Application (client) ID and set the appropriate Redirect URI(s) that match the locations where your SPA will be hosted and receive the authentication responses.

1. Register a New Application
    - Inside Microsoft Entra ID, on the left side menu under the "Manage" section, click "App Registrations".
    - Click on "New registration" at the top.
    - Enter a name for your application.
    - Choose who can use the application. For testing, you can select "Accounts in this organizational directory only".
    - Under the Redirect URI, Select "Single-page Application (SPA)" and add the URI where your React app will be running plus any specific path needed for the auth response. For example, if your React app is running locally on port 3000, you might add `http://localhost:3000`
1. Obtain Application (Client) ID and Directory (Tenant) ID
    - After the application is registered, Azure will direct you to the application's overview page where you can find the Application (client) ID and Directory (tenant) ID. Note these down as they will be required in your application's configuration files.
1. Update Your Frontend Configuration
    - Update `frontend/src/authConfig.js` in your React application with the Application (client) ID and Directory (tenant) ID. Do **not** use the client secret in your frontend application!

### Single App Registration

Here are the steps you must follow for a signle app registration being shared between your frontend and backend:

#### Option 2) Create app registration for both Frontend and Backend

##### Step 1: Register your Application in Azure

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

##### Step 2: Configure Authentication and API Permissions

1. Add API Permissions
    - Go to "API permissions" under Manage.
    - Click on "Add a permission", then choose "Microsoft APIs" and select "Microsoft Graph".
    - Choose "Delegated permissions", and add permissions like "User.Read" which allows the app to sign in the user and read their profile.
    - Click "Add permissions" to save changes.
1. Grant Admin Consent for Default Permissions
    - Still in the "API permissions" page, click "Grant admin consent for [Your Organization]" to grant the necessary permissions.

##### Step 3: Configure Redirect URIs

1. Set Redirect URIs
    - In the Azure portal, under the application registration, go to "Authentication".
    - Under "Platform configurations", click on "Add a platform".
    - Choose "Single-page application" and enter the redirect URI used in your React application (e.g., `http://localhost:3000`).

##### Step 4: Update your Application with Azure Credentials

1. Update Your Backend Configuration
    - Use the Application (client) ID, Directory (tenant) ID, and the client secret in your NestJS backend configuration located at `backend/src/auth/azure.strategy.ts`, specifically in the Azure strategy setup.

1. Update Your Frontend Configuration
    - Update `frontend/src/authConfig.js` in your React application with the Application (client) ID and Directory (tenant) ID. Do **not** use the client secret in your frontend application!
