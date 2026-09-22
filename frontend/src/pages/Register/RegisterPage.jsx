import React, { useState } from "react";
import "../../assets/styles/register.css";

const RegisterPage = () => {
  const [rfid, setRfid] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleUserRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rfid_uid: rfid, name: name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);
      setMessage(`✅ User "${name}" added successfully!`);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }

    // Clear form
    setRfid("");
    setName("");
  };

  return (
    <div className="register-page">
      <h1>Register New User</h1>

      <div className="register-section">
        <input
          type="text"
          placeholder="RFID UID"
          value={rfid}
          onChange={(e) => setRfid(e.target.value)}
          autoFocus
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleUserRegister}>Register User</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
