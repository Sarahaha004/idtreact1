
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import './profile.css'; // Import the CSS file

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
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-header">
            <h3>Welcome {userDetails.firstName}!</h3>
           
          </div>
          <div className="profile-content">
            <p>Email: {userDetails.email}</p>
          </div>
          <div className="profile-buttons">
          <button className="btn btn-primary" style={{ padding: "10px 20px" }}>
                <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
                  Go to Dashboard
                </Link>
              </button>
              <button className="btn btn-primary" onClick={handleLogout} style={{ padding: "10px 20px" }}>
                Logout
              </button>
            </div>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          {excelData && (
            <table className="profile-table">
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;

