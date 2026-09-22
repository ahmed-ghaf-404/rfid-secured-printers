import React, { useState } from "react";
import "../../assets/styles/print.css";

const PrintPage = () => {
  const [rfid, setRfid] = useState("");
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRFIDInput = async (event) => {
    const value = event.target.value;
    setError("");
    setRfid(value);

    if (value.length > 5) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users/rfid-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rfid_uid: value }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail);
        setUser(data.user);
        setMessage(`Hello ${data.user.name}! Ready to print.`);
      } catch (err) {
        setError(err.message);
        setUser(null);
        setMessage("");
      }
      setRfid(""); // Clear field after scan
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePrint = async () => {
    if (!user || !file) {
      alert("Please scan RFID and upload a file before printing.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/print-jobs/send", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error sending print job.");
    }
  };

  return (
    <div className="print-page">
      <h1>Print Your Document</h1>

      <input
        type="text"
        className="rfid-input"
        value={rfid}
        onChange={handleRFIDInput}
        placeholder="Scan your RFID card..."
        autoFocus
      />

      {error && <p className="error">{error}</p>}
      {user && <p>Logged in as: {user.name}</p>}

      <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />

      <button className="print-button" onClick={handlePrint} disabled={!user || !file}>
        Print
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PrintPage;
