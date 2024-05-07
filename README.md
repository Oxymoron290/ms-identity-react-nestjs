# React and NestJS example using the Microsoft Identity Platform

This application is a demonstration of integrating a [React frontend Single-page Applicaton](https://react.dev/) and [NestJS backend WebAPI](https://nestjs.com/) with the [Microsoft Identity Platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-overview).

Built in Node v20.12.2

# Steps:

- `npx @nestjs/cli new backend`
- `npx create-react-app frontend`
- install necessary packages
  - Frontend: `npm install @azure/msal-react @azure/msal-browser`
  - Backend: `npm install @nestjs/passport passport passport-azure-ad`
- Wire up Backend
  - Create `src/auth/auth.module.ts` - Organizes all authentication related features.
  - Create `src/auth/auth.service.ts` - Provides a service to validate users, which can be extended based on your business logic.
  - Create `src/auth/azure.strategy.ts` -  Implements the OAuth bearer strategy using Azure AD. Here, you configure your Azure AD client details and the token validation process. The validate() function is used to authenticate and authorize the user each time a protected route is accessed.
  - modify `src/app.module.ts` - Import your AuthModule into the main application module.