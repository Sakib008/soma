import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { PostProvider } from "./Context/PostContext";

makeServer();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <PostProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </PostProvider>
  </AuthProvider>
);

reportWebVitals();
