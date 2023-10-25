import React, { useState , useEffect} from "react";
import axios from "axios";
import BodyMapComponent from "../components/BodyMapComponent";
import { useAuth0 } from "@auth0/auth0-react";
const ReportFormPage = () => {
    
  
  const [reporterName, setReporterName] = useState("");
  const [injuryDate, setInjuryDate] = useState("");
  const [injuryTime, setInjuryTime] = useState("");

  const [InjuryList, setInjuryList] = useState([]);

  const { getAccessTokenSilently } = useAuth0();
  

  const updateInjuries= (vals)=>{
    console.log("Updating injuries in BodyMapComponent:", vals);
    setInjuryList(vals);
    
    
  }
  async function testApp(){
    try{
    const token = await getAccessTokenSilently();
    console.log(token);
    const response = await axios.get("http://localhost:5000/testing", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(response.data);
  } catch (error){
      console.log(error.message);
  }
    
    
  }

  const handleSubmit = (event) => {
   
    event.preventDefault();
    console.log('Form Submitted');
    
    const reportData = {
      name: reporterName,
      date: injuryDate,
      time: injuryTime,
      injuries: InjuryList
    };

    axios.post("http://localhost:5000/api/report", reportData)
    .then((res) => {
      
      console.log(res.data);
    })
    .catch((error) => {
      
      console.error(error);
    });
    
    
    setReporterName("");
    setInjuryDate("");
    setInjuryTime("");
   
  };

 
  return (
    <div>
      <h1>Report Form</h1>
      <form onSubmit={handleSubmit} >
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
        <br />
        <label>
          Body Map Selection:

            <BodyMapComponent  updateInjuries={updateInjuries}/>
         
         
        </label>
        <br />
        <button type="submit" >Submit</button>
        <button type="button" onClick={testApp}>Testing button</button>
      </form>
    </div>
  );
};

export default ReportFormPage;


