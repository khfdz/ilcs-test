import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SearchProvider } from "./context/SearchContext"; // Provider SearchContext
import { BookingProvider } from "./context/BookingContext"; // Provider BookingContext

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </SearchProvider>
  </React.StrictMode>
);

reportWebVitals();
