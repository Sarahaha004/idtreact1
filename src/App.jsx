import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import FileUpload from "./components/dashboard";
import Employee from "./Employee";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
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
