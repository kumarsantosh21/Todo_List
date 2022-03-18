import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./originpages";
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import client from "./originpages/Client";
import Dahboard from "./v1/Dashboard";
// import reportWebVitals from './reportWebVitals';
// // Add your Realm App ID
// // Connect to your MongoDB Realm app
// const app = new Realm.App(APP_ID.appid);

// // Gets a valid Realm user access token to authenticate requests
// async function getValidAccessToken() {
//   // Guarantee that there's a logged in user with a valid access token

//   // for resgistring a user
//   // const email = "qwertyuiop";
//   // const password = "qwertyuiop";
//   // await app.emailPasswordAuth.registerUser({ email, password });

//   if (!app.currentUser) {
//     // If no user is logged in, log in an anonymous user. The logged in user will have a valid
//     // access token.

//     await app.logIn(
//       Realm.Credentials.emailPassword("san@123.com", "san@123.com")
//     );
//   } else {
//     // An already logged in user's access token might be stale. To guarantee that the token is
//     // valid, we refresh the user's custom data which also refreshes their access token.
//     await app.currentUser.refreshCustomData();
//     console.log(app.currentUser.accessToken);
//     console.log(app.currentUser);
//   }

//   return app.currentUser.accessToken;
// }

// // Configure the ApolloClient to connect to your app's GraphQL endpoint
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: `https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID.appid}/graphql`,
//     // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
//     // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
//     // access token before sending the request.
//     fetch: async (uri, options) => {
//       const accessToken = await getValidAccessToken();
//       options.headers.Authorization = `Bearer ${accessToken}`;
//       return fetch(uri, options);
//     },
//   }),
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/v1/dashboard" element={<Dahboard />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
