// FileUpload.js
import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Example: Make a fetch request to upload the file
      fetch('http://example.com/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded successfully:', data);
          // You can handle success messages or update UI accordingly
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle error messages or update UI accordingly
        });
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {fileName && <p>Selected File: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
