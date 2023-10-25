import React, { useState } from 'react';

function ReportForm() {
  const [reporterName, setReporterName] = useState('');
  const [injuryDate, setInjuryDate] = useState('');
  const [injuryTime, setInjuryTime] = useState('');
  const [bodyMapSelection, setBodyMapSelection] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    // ...

    // Send data to backend API to create a new injury report
    // ...

    // Reset form fields
    setReporterName('');
    setInjuryDate('');
    setInjuryTime('');
    setBodyMapSelection('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          value={bodyMapSelection}
          onChange={(event) => setBodyMapSelection(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReportForm;