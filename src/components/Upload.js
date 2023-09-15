import React, { useState } from "react";
import axios from "axios";

const ExcelUpload = ({ setMessage }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
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
        setMessage("Error uploading file.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <h2>Excel File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

const ImageUpload = ({ setMessage }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const invalidFiles = files.filter(
      (file) => !allowedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError("Invalid file type. Please select JPEG or PNG images.");
    } else {
      setSelectedFiles(files);
      setError(null);
    }
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();

      selectedFiles.forEach((file, index) => {
        formData.append(`image${index + 1}`, file);
      });

      await axios.post("http://localhost:5000/upload-image", formData);
      setMessage("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      setMessage("Error uploading images.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        multiple
        onChange={handleFileChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={uploadImages} disabled={selectedFiles.length === 0}>
        Upload Images
      </button>
    </div>
  );
};

const Upload = ({ file_type }) => {
  const [message, setMessage] = useState("");

  return (
    <div>
      {file_type === "excel" ? (
        <ExcelUpload setMessage={setMessage} />
      ) : file_type === "image" ? (
        <ImageUpload setMessage={setMessage} />
      ) : (
        <p>Please specify valid format.</p>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Upload;
