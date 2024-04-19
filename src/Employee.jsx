import React, { useState } from 'react';
import Navbar from './components/Navbar';
import * as XLSX from 'xlsx'; // Import XLSX using the namespace import

const Employee = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const newExcelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setExcelData(newExcelData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="col-12">
          <div className="employee-content text-center">
          <h1 className="text-center mb-5">Employee Details</h1>
          <div className="mb-5">
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
};

export default Employee;

