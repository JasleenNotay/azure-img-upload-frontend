import React, { useState } from "react";
import axios from "axios";

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

export default ImageUpload;
