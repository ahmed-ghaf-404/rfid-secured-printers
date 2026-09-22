import React, { useState } from "react";
import "../../assets/styles/login.css";

const LoginPage = ({ setUser }) => {
  const [rfid, setRfid] = useState("");
  const [error, setError] = useState("");

  const handleScan = async (event) => {
    setError(""); // Clear previous errors
    setRfid(event.target.value); // Capture RFID input

    if (event.target.value.length > 5) { // Assuming RFID UID is at least 6 characters
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users/rfid-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rfid_uid: event.target.value }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail);

        setUser(data.user); // Save user state
        alert(`Welcome ${data.user}!`);
      } catch (err) {
        setError(err.message);
      }
      setRfid(""); // Clear input field
    }
  };

  return (
    <div className="login-page">
      <h1>Scan Your RFID Card</h1>
      <input
        type="text"
        className="rfid-input"
        value={rfid}
        onChange={handleScan}
        autoFocus
        placeholder="Scan your RFID card here..."
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
