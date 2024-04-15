import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import FileUpload from "./components/dashboard";

import { ToastContainer } from "react-toastify";

function FullPageContainer({ children }) {
  return <div className="container-fullpage">{children}</div>;
}

function SmallBoxContainer({ children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SmallBoxContainer><SignUp /></SmallBoxContainer>} />
          <Route path="/login" element={<SmallBoxContainer><Login /></SmallBoxContainer>} />
          <Route path="/register" element={<SmallBoxContainer><SignUp /></SmallBoxContainer>} />
          <Route path="/profile" element={<FullPageContainer><Profile /></FullPageContainer>} />
          <Route path="/dashboard" element={<FullPageContainer><FileUpload /></FullPageContainer>} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
