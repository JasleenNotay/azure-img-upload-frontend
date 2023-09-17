import React, { useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import ExcelUpload from "./components/ExcelUpload";
import ImageUpload from "./components/ImageUpload";
import "./App.css";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <BrowserRouter>
      <header>
        <h1>Uploads</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link
              to="/excel-upload"
              onClick={() => handleOptionClick("excel")}
              className={selectedOption === "excel" ? "active" : ""}
            >
              Excel Upload
            </Link>
          </li>
          <li>
            <Link
              to="/image-upload"
              onClick={() => handleOptionClick("image")}
              className={selectedOption === "image" ? "active" : ""}
            >
              Image Upload
            </Link>
          </li>
        </ul>
      </nav>
      <div className="routes-container">
        <Routes>
          <Route
            path="/excel-upload"
            element={
              selectedOption === "excel" ? <ExcelUpload /> : <p>Upload Excel</p>
            }
          />
          <Route
            path="/image-upload"
            element={
              selectedOption === "image" ? <ImageUpload /> : <p>Upload Image</p>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
