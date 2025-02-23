import React, { useState, useEffect } from "react";
import { uploadFile } from "../services/api";
import "./App.css";


const apiUrl = import.meta.env.VITE_API_URL;


const App = () => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      setUploadedFile(file);
      setFile(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  useEffect(() => {
    const getImage = async () => {
      if (uploadedFile) {
        const data = new FormData();
        data.append("name", uploadedFile.name);
        data.append("file", uploadedFile);

        let response = await uploadFile(data);
        setResult(`${apiUrl}/file/${response?.fileId}` || "");
      }
    };
    getImage();
  }, [uploadedFile]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to Link It</h1>
        <p>Your simple and secure file-sharing platform. Easily upload your files and get a shareable link.</p>
      </header>
      <div className="upload-box">
        <h2>Upload & Share</h2>
        <p>Select a file to upload and share with others instantly.</p>

        <input type="file" onChange={handleFileChange} className="file-input" />

        <button onClick={handleUpload} disabled={!file} className="upload-button">
          Upload
        </button>

        {result && (
          <div className="result-box">
            <p>File URL:</p>
            <input type="text" value={result} readOnly className="result-input" />
            <div className="button-group">
              <button onClick={handleCopy} className={`copy-button ${copied ? "copied" : ""}`}>
                {copied ? "Copied!" : "Copy"}
              </button>
              <a href={result} target="_blank" rel="noopener noreferrer" className="download-link">
                Download
              </a>
            </div>
          </div>
        )}
      </div>
      <p style={{ color: "#121212" }}>நான் வீழ்வேனென்று நினைத்தாயோ ? - Bharathiyar</p>
      </div>
  );
};

export default App;
