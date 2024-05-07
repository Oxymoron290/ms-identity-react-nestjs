# React and NestJS example using the Microsoft Identity Platform

This application is a demonstration of integrating a [React frontend Single-page Applicaton](https://react.dev/) and [NestJS backend WebAPI](https://nestjs.com/) with the [Microsoft Identity Platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-overview).

Built in Node v20.12.2

# Steps:

- `npx @nestjs/cli new backend`
- `npx create-react-app frontend`
- install necessary packages
  - Frontend: `npm install @azure/msal-react @azure/msal-browser`
  - Backend: `npm install @nestjs/passport passport passport-azure-ad`
