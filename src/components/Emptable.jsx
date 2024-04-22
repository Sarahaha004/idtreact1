import React from 'react';

const Emptable = () => {

  const csvData = `John Doe,E001,123-456-7890,New York
Jane Smith,E002,234-567-8901,Los Angeles
Michael Johnson,E003,345-678-9012,Chicago
Emily Davis,E004,456-789-0123,Houston
Christopher Wilson,E005,567-890-1234,Miami
Samantha Brown,E006,678-901-2345,Seattle
Daniel Martinez,E007,789-012-3456,San Francisco
Amanda Lee,E008,890-123-4567,Denver
Matthew Taylor,E009,901-234-5678,Boston
Ashley Anderson,E010,012-345-6789,Atlanta`;

  // Split CSV data into rows
  const rows = csvData.split('\n').map(row => row.split(','));

  return (
    <div>
      <table className="table table-bordered" style={{ fontSize: "24px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee Number</th>
            <th>Phone Number</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Emptable;
