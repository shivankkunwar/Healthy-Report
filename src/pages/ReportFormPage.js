import React, { useState, useEffect } from "react";
import axios from "axios";
import BodyMapComponent from "../components/BodyMapComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./styles/RFP.css";
const ReportFormPage = () => {
  const [reporterName, setReporterName] = useState("");
  const [injuryDate, setInjuryDate] = useState("");
  const [injuryTime, setInjuryTime] = useState("");

  const [InjuryList, setInjuryList] = useState([]);

  const {isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  
  const updateInjuries = (vals) => {
    
    setInjuryList(vals);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    if (!isAuthenticated) {
      // Handle case where user is not authenticated
      navigate("/"); // Replace with your desired route for non-authenticated users
      return;
    }

    const reportData = {
      name: reporterName,
      date: injuryDate,
      time: injuryTime,
      injuries: InjuryList,
    };
    const token = await getAccessTokenSilently();

    axios
      .post(
        "https://health-report-api.onrender.com/api/report",

        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("posted");
      })
      .catch((error) => {
        console.error(error);
      });

    navigate(-1);
  };

  return (
    <div className="form-container">
      <h1>Report Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="top-form ">
          <label>
            Reporter's Name:
            <input
              type="text"
              value={reporterName}
              onChange={(event) => setReporterName(event.target.value)}
            />
          </label>
          <br />
          <label>
            Date of Injury:
            <input
              type="date"
              value={injuryDate}
              onChange={(event) => setInjuryDate(event.target.value)}
            />
          </label>
          <br />
          <label>
            Time of Injury:
            <input
              type="time"
              value={injuryTime}
              onChange={(event) => setInjuryTime(event.target.value)}
            />
          </label>
        </div>

        <br />
        <label>
          <BodyMapComponent updateInjuries={updateInjuries} />
        </label>
        <br />
        <div className="submit-button">
          <button type="submit">Submit</button>
          <button type="back" onClick={()=>navigate("/")} >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ReportFormPage;
