# React and NestJS example using the Microsoft Identity Platform

This application is a demonstration of integrating a [React frontend Single-page Applicaton](https://react.dev/) and [NestJS backend WebAPI](https://nestjs.com/) with the [Microsoft Identity Platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-overview).

Built in Node v20.12.2

# Steps:

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