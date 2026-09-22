import React, { useEffect, useState } from "react";
import "../../assets/styles/print.css";

const PrintHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/print-jobs/history");
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  return (
    <div className="print-page">
      <h1>Print Job History</h1>
      {history.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <table className="print-history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.user_name}</td>
                <td>{job.status}</td>
                <td>{new Date(job.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrintHistoryPage;
