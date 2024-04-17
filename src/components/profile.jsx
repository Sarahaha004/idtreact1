import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setExcelData(excelData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className='container-fluid'>
      <div className="row">
        <nav className="col-2 bg-dark vh-100 d-flex flex-column align-items-center justify-content-center">
          <img src="https://media.istockphoto.com/id/1053291038/vector/business-finance-bar-profit-vector-illustration.jpg?s=612x612&w=0&k=20&c=r0axxeuEroKcQO7lhVziB0-AFuRTFfGUfnrfF1euzB4=" alt="Logo" className="img-fluid mb-3" style={{ maxHeight: "80px" }} />
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-light">Dashboard</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link text-light" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className="col-10">
          <div className="profile-content">
            <h1>Welcome {userDetails?.firstName}!</h1>
            <h3>Email: {userDetails?.email}</h3>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          </div>
          {excelData && (
            <table className="table">
              <thead>
                <tr>
                  {excelData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
