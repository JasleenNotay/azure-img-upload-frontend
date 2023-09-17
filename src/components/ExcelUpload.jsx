import React, { useState } from "react";
import axios from "axios";
import "./ExcelUpload.css";

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError("");

    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        process.env.REACT_APP_UPLOAD_API,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("File uploaded and data inserted successfully.");
      } else {
        setError("Error uploading file.");
      }
    } catch (error) {
      setError("An error occurred while uploading the file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="excel-upload-container">
      <h2>Excel File Upload</h2>
      <form onSubmit={handleSubmit}>
        <label className="custom-file-upload">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
          />
          Choose File
        </label>
        <button
          type="submit"
          className="upload-button"
          disabled={!file || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ExcelUpload;
