import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const ReportsPage = () => {
  const [reports, setReports] = useState([
    {
      name: "shivank",
      date: "2023-10-06",
      time: "23:46",
      injuries: [
        {
          number: 1,
          area: "head",
          details: "",
          x: 77,
          y: 28,
        },
        {
          number: 2,
          area: "left hand",
          details: "",
          x: 22,
          y: 136,
        },
        {
          number: 3,
          area: "right hand",
          details: "",
          x: 124,
          y: 131,
        },
        {
          number: 4,
          area: "left leg",
          details: "",
          x: 63,
          y: 211,
        },
        {
          number: 5,
          area: "right leg",
          details: "",
          x: 105,
          y: 215,
        },
      ],
    },
    {
      name: "kunwar",
      date: "2023-10-06",
      time: "23:46",
      injuries: [
        {
          number: 1,
          area: "head",
          details: "",
          x: 77,
          y: 28,
        },
        {
          number: 2,
          area: "left hand",
          details: "",
          x: 22,
          y: 136,
        },
        {
          number: 3,
          area: "right hand",
          details: "",
          x: 124,
          y: 131,
        },
        {
          number: 4,
          area: "left leg",
          details: "",
          x: 63,
          y: 211,
        },
        {
          number: 5,
          area: "right leg",
          details: "",
          x: 105,
          y: 215,
        },
      ],
    },
  ]);

  //   useEffect(() => {
  //     axios
  //       .get("reports.json")
  //       .then((response) => {
  //         setReports(...reports,response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching reports", error);
  //       });
  //   }, []);
  


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
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.name}</td>
              <td>{report.date}</td>
              <td>
                <Link
                  to={{
                    pathname: "/report-card",
                    state: { Name:report.name,Date:report.date,Time:report.time,injuries: report.injuries },
                  }}
                >
                  <button onClick={()=>console.log(report)}> more </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default ReportsPage;
