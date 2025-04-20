import React, { useRef, useState } from "react";
import "../styles/Landing.css";

const Landing = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; type: string } | null>(null);
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000); // auto-hide after 3 sec
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return showPopup("No file selected", "error");

    setFileInfo({ name: file.name, type: file.type });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        showPopup("Upload successful!", "success");
        console.log(data);
      } else {
        showPopup("Upload failed", "error");
        console.error(data);
      }
    } catch (error) {
      showPopup("An error occurred", "error");
      console.error(error);
    }
  };

  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="headline">Evapora: Secure Your Files</h1>
        <p className="subtext">
          Upload your files securely, and protect your privacy with our geo-intelligent system.
        </p>
        <button className="cta-btn" onClick={handleButtonClick}>
          Upload a File
        </button>
        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      {popup && (
        <div className={`popup-box ${popup.type}`}>
          <p>{popup.message}</p>
        </div>
      )}
    </div>
  );
};

export default Landing;
