import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Navbar from './Navbar';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (predictionData) {
      const salesAmounts = predictionData.map(row => row.sales_amount);
      const productNames = predictionData.map(row => row.product_name);
      createBarChart('barChart', productNames, salesAmounts);
      createPieChart('pieChart', productNames, salesAmounts);
    }
  }, [predictionData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to upload file');
          }
          return response.json();
        })
        .then((data) => {
          setPredictionData(data);
          setError(null);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          setError('Error uploading file. Please try again.');
          setPredictionData(null);
        });
    }
  };

  const createBarChart = (canvasId, labels, data) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales Amount',
          data: data,
          backgroundColor: [
            '#1A2238',
            '#9DAAF2',
            '#FF6A3D',
            '#F4DB7D',
            '#6E4E15' 
          ]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const createPieChart = (canvasId, labels, data) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales Amount',
          data: data,
          backgroundColor: [
            '#1A2238',
            '#9DAAF2',
            '#FF6A3D',
            '#F4DB7D',
            '#6E4E15'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar style={{ width: "200px", marginRight: "20px" }} />
      <div className="justify-content-center align-items-center vh-100 profilepage container-fluid" style={{ display: "flex", flexDirection: "column", flex: "1" }}>
        <div >
          <h1 className="text-center mb-5">Sales Commission Prediction</h1>
          <form id="uploadForm" encType="multipart/form-data" style={{ fontSize: "35px" }}>
            <div className="mb-3">
              <label htmlFor="salesData" className="form-label" >
                Upload Sales Data CSV File:
              </label>
              <input
                type="file"
                id="salesData"
                name="salesData"
                accept=".csv"
                required
                className="form-control"
                onChange={handleFileChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpload}>
              Predict
            </button>
          </form>
          {fileName && <p className="mt-3">Selected File: {fileName}</p>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {predictionData && (
            <div className="mt-4">
              <h2 className="text-center mb-4" style={{ fontSize: "50px" }}>Prediction Table</h2>
              <table className="table table-bordered" style={{ fontSize: "24px" }} >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales Amount</th>
                    <th>Product Demand Level</th>
                    <th>Predicted Sales Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {predictionData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.product_name}</td>
                      <td>{row.sales_amount}</td>
                      <td>{row.product_demand_level}</td>
                      <td>{row.predicted_sales_commission.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {predictionData && (
            <div className="mt-4">
              <h2 className="text-center mb-4">Analytics</h2>
              <div className="row">
                <div className="col-md-6">
                  <canvas id="barChart"></canvas>
                </div>
                <div className="col-md-6">
                  <canvas id="pieChart"></canvas>
                </div>
              </div>
            </div>
          )}
    </div>
        </div>
      </div>
  );
};

export default FileUpload;
