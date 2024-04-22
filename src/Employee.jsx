import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import * as XLSX from 'xlsx'; // Import XLSX using the namespace import
import { toast } from 'react-toastify';

import { auth } from "./components/firebase"; // Import the auth object from the Firebase authentication module
import { db } from "./components/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Emptable from './components/Emptable';
const Employee = () => {
  const [excelData, setExcelData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    // Retrieve the uploaded file from Firebase DB
    const fetchEmployeeData = async () => {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid); // Assuming you have stored the file data under the user document
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data().EmpData;
          setExcelData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error retrieving employee data: ", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleUpload = async () => {
    if (uploadedFile) {
      // Upload the new file to Firebase DB and delete the old one
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const newExcelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });


        try {
          const docRef = doc(db, "Users", auth.currentUser.uid); 
          await setDoc(docRef, { EmpData: newExcelData });
          setExcelData(newExcelData);
          toast.success("File uploaded successfully!");
        } catch (error) {
          console.error("Error uploading file: ", error);
          toast.error("Failed to upload file. Please try again.");
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  return (
    <div style={{ marginLeft: '255px' }}>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="employee-content text-center">
              <h2 className="text-center mb-4" style={{ fontSize: "50px" }}>Employee Details</h2>
              {excelData && (
                <table className="table table-striped">
                  <thead className="table-dark">
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
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control form-control-lg" />
                <button className="btn btn-primary btn-lg" onClick={handleUpload}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Emptable/>
    </div>
  );
} 

export default Employee;
