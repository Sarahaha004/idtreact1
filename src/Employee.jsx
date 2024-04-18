import React from 'react'
import Navbar from './components/navbar';

const employee = () => {
    
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
        excelData(excelData);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <div>
      <Navbar/>
    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
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
  )
}

export default employee