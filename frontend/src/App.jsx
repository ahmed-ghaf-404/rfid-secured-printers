import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/Login/LoginPage";
import PrintPage from "./pages/Print/PrintPage";
import RegisterPage from "./pages/Register/RegisterPage";
import UsersPage from "./pages/Users/UsersPage";
import PrintHistoryPage from "./pages/PrintHistory/PrintHistoryPage";
import "./assets/styles/app.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/print" element={<PrintPage user={user} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UsersPage />} />
          {/* TODO: logging print jobs.. */}
          <Route path="/history" element={<PrintHistoryPage />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;
