import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const ReportsPage = () => {
  const navigate= useNavigate();
  const [reports, setReports] = useState([
    
  ]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(()=>{
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
  },[])
    
  
    
  


  return (
    <div>
      <h1>Reports</h1>
      <Link to="/submit-report">
        <button>Add Report</button>
      </Link>
      
      <table>
        <thead>
          <tr>
            <th>Reporter</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        
        
        <tbody>
          {reports&&reports.map((report, index) => (
            <tr key={index}>
              <td>{report.name}</td>
              <td>{report.date}</td>
              {console.log(report.injuries)}
              <td>
                  <button onClick={()=>{navigate('/report-card', {state: {name:report.name, date: report.date,time: report.time, injuries: report.injuries}})}}> more </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default ReportsPage;
