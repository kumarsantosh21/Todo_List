import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Dahboard from "./v1/Dashboard";
import Navbar from "./v1/Navbar/Navbar";
import {
  Client,
  Login,
  Register,
  Reset,
  ResetConfirmation,
  GoogleAuth,
} from "./originpages";
// import { Loading } from "./assets/Loaders";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/resetpassword" element={<Reset />} />
          <Route path="/resetconfirmation" element={<ResetConfirmation />} />
          <Route path="/googleauth" element={<GoogleAuth />} />
          <Route path="/v1/dashboard" element={<Dahboard />} />
          <Route path="/v1/experimentzone" element={<Dahboard />} />
          <Route path="/v1/navbar" element={<Navbar />} />
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
