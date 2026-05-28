import React from "react";

import ReactDOM
from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";

import App from "./App";

import "./index.css";

import {
  CartProvider
} from "./context/CartContext";

import {
  AuthProvider
} from "./context/AuthContext";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <AuthProvider>

  <CartProvider>

    <QueryClientProvider client={queryClient}>

    <BrowserRouter>

      <App />

    </BrowserRouter>

    <ReactQueryDevtools
    
  initialIsOpen={false}
/>

    </QueryClientProvider>

  </CartProvider>

</AuthProvider>

  </React.StrictMode>

);