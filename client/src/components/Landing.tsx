import React, { useRef } from "react";
import "../styles/Landing.css";

const Landing = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();  // Triggers the file input click
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload success:", data); // Log the response for debugging
        alert("File uploaded successfully!");
      } else {
        console.error("Upload failed with status:", response.status);
        alert(`Upload failed. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading. Please try again.");
    }
  };

  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="headline">Evapora: Secure Your Files</h1>
        <p className="subtext">Geo-intelligent, self-destructing file storage solution.</p>
        <p className="description">
          Upload your files securely and set parameters like location, time limit, and authorization level.
        </p>
        <button className="cta-btn" onClick={handleButtonClick}>
          Upload a File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}  // Handling the file input change event
        />
      </div>
    </div>
  );
};

export default Landing;
