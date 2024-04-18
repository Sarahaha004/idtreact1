import React from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "./firebase";

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
      className="col-2 bg-dark d-flex flex-column align-items-center justify-content-between"
      style={{ height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      <div>
        <img
          src="https://media.istockphoto.com/id/1053291038/vector/business-finance-bar-profit-vector-illustration.jpg?s=612x612&w=0&k=20&c=r0axxeuEroKcQO7lhVziB0-AFuRTFfGUfnrfF1euzB4="
          alt="Logo"
          className="img-fluid mb-3"
          style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
        />
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-light">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/employee" className="nav-link text-light">
              Employee
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="btn btn-link text-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
