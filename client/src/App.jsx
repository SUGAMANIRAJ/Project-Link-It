import React, { useState, useEffect } from "react";
import { uploadFile } from "../services/api";
import "/src/App.css";

const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [result, setResult] = useState("");
  const  [resultFileId, setResultFileId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      setUploadedFile(file);
      setFile(null);
      setLoading(true);
      setError(""); 
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    const getImage = async () => {
      if (uploadedFile) {
        if (uploadedFile.size > 4.5 * 1024 * 1024) {
          setLoading(false);
          setError("File size exceeds 4.5MB. Please upload a smaller file.");
          return;
        }

        const data = new FormData();
        data.append("name", uploadedFile.name);
        data.append("file", uploadedFile);

        try {
          let response = await uploadFile(data);
          if (response?.fileId) {
            setResult(`${apiUrl}/file/${response.fileId}`);
            setResultFileId(response.fileId);
          } else {
            setError("Error uploading file. Please try again.");
          }
        } catch (error) {
          setError("An error occurred while uploading the file.");
        } finally {
          setLoading(false);
        }
      }
    };
    getImage();
  }, [uploadedFile]);

  return (
    <div className="app-container">
      <header className="header">
        <img src="/infinity.svg" alt="Logo" className="header-logo" />
        <h1>Welcome to Link It</h1>
        <p>
          Your simple and secure file-sharing platform. Easily upload your files
          and get a shareable link.
        </p>
      </header>

      <div className="app-content">
        <div className="upload-box">
          <h2>Upload & Share</h2>

          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            disabled={loading}
          />

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`upload-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          {error && <p className="error-message">{error}</p>}

          

          {result && (

            
            <div className="result-box">
              
              <p>Quick Access Id:</p>
              <input
                type="text"
                value={resultFileId}
                readOnly
                className="result-input"
              />

              <p>File URL:</p>
              <input
                type="text"
                value={result}
                readOnly
                className="result-input"
              />

          
           
              
              

              <div className="button-group">
                <button
                  onClick={handleCopy}
                  className={`copy-button ${copied ? "copied" : ""}`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="heart-section">
          <button onClick={handleLike} className="heart-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill={liked ? "red" : "none"}
              stroke="red"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Heart this page if you like!</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
