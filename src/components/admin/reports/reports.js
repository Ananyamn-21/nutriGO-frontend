import React, { useEffect, useState } from "react";
import "./report.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
 
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/food/allReports'); 
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReports();
  }, []);

  const handleView = (reportId) => {
    console.log(`Viewing report with ID: ${reportId}`);
  };

  const handleDelete = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:8080/food/reports/${reportId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete report");
      }
      setReports(reports.filter((report) => report._id !== reportId));
    } catch (err) {
      console.error("Error deleting report:", err);
      setError("Failed to delete report. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Problem Reports</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="reports-crd">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Reported By</th>
              <th scope="col">Description</th>
              <th scope="col">email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <tr key={report._id}>
                  <td>{index + 1}</td>
                  <td>{report.name}</td>
                  <td>{report.problem}</td>
                  <td>{report.email}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(report._id)}
                    >
                      View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(report._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
