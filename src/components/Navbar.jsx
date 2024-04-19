import React from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import '../App.css';

function Navbar() {
  const location = useLocation();

  // Hide navbar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <nav
      className="col-2 custom-navbar-color d-flex flex-column align-items-center justify-content-between"
      style={{ height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      <div>
        <img
          src="/images/saleslogo.png"
          alt="Logo"
          className="img-fluid mb-3"
          style={{ width: "100%", maxHeight: "270px", objectFit: "cover" }}
        />
        <ul className="nav flex-column text-center">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-light"  style={{ fontSize: "30px", fontWeight: "bold" }}>
              Prediction
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/employee" className="nav-link text-light"  style={{ fontSize: "30px", fontWeight: "bold" }}>
              Employee
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-light"  style={{ fontSize: "30px", fontWeight: "bold" }}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="btn  text-light" onClick={handleLogout}  style={{ fontSize: "30px", fontWeight: "bold",paddingBottom: "50px" }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
