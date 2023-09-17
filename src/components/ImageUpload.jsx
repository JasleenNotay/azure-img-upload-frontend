import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

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

      console.log(response.data);
      setMessage("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      setError("Error occurred during image upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Image File Upload</h2>
      <form onSubmit={handleSubmit}>
        <label className="custom-file-upload">
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={(event) => setSelectedImage(event.target.files[0])}
          />
          Choose file
        </label>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button
          type="submit"
          disabled={!selectedImage || isUploading}
          className="upload-button"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
