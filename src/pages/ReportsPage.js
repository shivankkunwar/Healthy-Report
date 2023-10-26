import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/RP.css";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:5000/api/report", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="container-top">
      <div className="title-page">
        <h1>
          {" "}
          Your <span>Reports</span>
        </h1>
        <Link to="/submit-report">
          <button id="add-report-button">Add Report</button>
        </Link>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Reporter</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {reports &&
              reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.name}</td>
                  <td>{new Date(report.date).toLocaleDateString()}</td>
                  <td>{report.time}</td>
                  {console.log(report.injuries)}
                  <td>
                    <button
                      onClick={() => {
                        navigate("/report-card", {
                          state: {
                            name: report.name,
                            date: report.date,
                            time: report.time,
                            injuries: report.injuries,
                          },
                        });
                      }}
                    >
                      {" "}
                      more{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
