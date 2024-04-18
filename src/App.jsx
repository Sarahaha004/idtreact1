import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Register";
import Profile from "./components/Profile";
import FileUpload from "./components/Dashboard";
import Employee from "./employee";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<FileUpload />} />
          <Route path="/employee" element={<Employee/>} /> 
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
