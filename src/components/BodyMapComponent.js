import React, { useState, useRef, useEffect } from 'react';
import "./styles/BMC.css"
function BodyMap({updateInjuries}) {
  // Create an array of injuries using useState
    const [currInjuries, setCurrInjuries] = useState([]);
    const [finalReport, setFinalReport]= useState("");
  // Create an array of circles using useState
  const [circles, setCircles] = useState([]);

   

  // Create a reference to the canvas element using useRef
    const canvasRef = useRef(null);


    useEffect (()=>console.log(currInjuries),[currInjuries])



    // Define a function that draws a circle on the canvas
  const drawCircle = (x, y, r, color, number) => {
    // Get the canvas context object
    const ctx = canvasRef.current.getContext('2d');
    // Start a new path
    ctx.beginPath();
    // Draw an arc with the given coordinates, radius, and angle
    ctx.arc(x, y, r, 0, Math.PI * 2);
    // Fill the circle with the given color
    ctx.fillStyle = color;
    ctx.fill();
    // Stroke the circle with a black border
    ctx.strokeStyle = 'black';
    ctx.stroke();
    // Draw the number inside the circle with a white font
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(number, x - r / 2, y + r / 2);
  }

  // Define a function that checks if a point is inside a circle
  const isInsideCircle = (x, y, cx, cy, r) => {
    // Calculate the distance between the point and the center of the circle
    const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    // Return true if the distance is less than or equal to the radius
    return distance <= r;
  }

  // Define a function that handles the click event on an area
  const handleClick = (e, area) => {
    // Prevent the default behavior of redirecting to the href
    e.preventDefault();
    // Get the x and y coordinates relative to the image
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    
    // Check if any of the existing circles contains the point
    for (let circle of circles) {
      if (isInsideCircle(x, y, circle.x, circle.y, circle.r)) {
        // If yes, return without adding a new circle or injury
        return;
      }
    }
    // Update the state with a new injury object
    setCurrInjuries(prevInjuries => ([
      ...prevInjuries,
      { number: prevInjuries.length + 1, area: area , details: "",  x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}
    ]));
    
    // Update the state with a new circle object
    setCircles(prevCircles => ([
      ...prevCircles,
      { x: x, y: y, r: 20, color: getRandomColor(), number: prevCircles.length + 1 }
    ]));
  }

  const handleInputChange = ( e, index) => {
    const value = e.target.value;

    setCurrInjuries(prevInjuries => {
      const newInjuries = [...prevInjuries];
      newInjuries[index] = {
        ...newInjuries[index],
        details: value
      };
      return newInjuries;
    });
  }

  // Define a function that renders a list of injuries
  const renderInjuries = () => {
    // Use the map method to create a list item for each injury
    return currInjuries.map((injury, index) => (
      <li key={injury.number}>
        <label htmlFor={`injury-${injury.number}`}>Injury {injury.number} on {injury.area}</label>

        <input id={`injury-${injury.number}`} type="text" placeholder="Explain more about the injury" onChange={(e) => handleInputChange(e, index)} />
      </li>
    ));
  }

  // Define a function that returns a random color in hexadecimal format
  const getRandomColor = () => {
    // Define an array of possible color values
    const values = '0123456789ABCDEF';
    // Initialize an empty string for the color
    let color = '#';
    // Loop six times to generate six characters
    for (let i = 0; i < 6; i++) {
      // Append a random value from the array to the color string
      color += values[Math.floor(Math.random() * 16)];
    }
    // Return the color string
    return color;
  }

  // Use the useEffect hook to draw the circles on the canvas after each render
  useEffect(() => {
    // Loop through the circles array and call the draw function for each circle
    for (let circle of circles) {
      drawCircle(circle.x, circle.y, circle.r, circle.color, circle.number);
    }
  },[circles]);

  const makeFinalUpdate =()=>{
    console.log("updating the curr injury list");
    updateInjuries(currInjuries);
  }
  return (
    <div className="container">
      <h1>Body Map</h1>
      <p>Click on different areas of the body to report injuries.</p>
      <div className="image-map">
        {/* Use an image with a useMap attribute */}
        <canvas className='canvas' ref={canvasRef} width="284" height="298" />
        <img src="Sbody.png" alt="Body" useMap="#body-map" />
        {/* Use a canvas element with a ref attribute */}
       
        {/* Use a map tag with a name attribute */}
        <map name="body-map">
          {/* Use area tags with shape, coords, alt, href, and onClick attributes */}
          <area  className ="" shape="circle" coords="76,31,19" alt="Head" title="Head" href="#" onClick={(e) => handleClick(e, "head")} />
          <area shape="circle" coords="35,123,24" alt="Left hand" title="Left hand" href="#" onClick={(e) => handleClick(e, "left hand")} />
          <area shape="circle" coords="76,74,15" alt="Chest" title="Chest" href="#" onClick={(e) => handleClick(e, "chest")} />
          <area shape="circle" coords="116,120,23" alt="Right hand" title="Right hand" href="#" onClick={(e) => handleClick(e, "right hand")} />
          <area shape="circle" coords="60,211,16" alt="Left leg" title="Left leg" href="#" onClick={(e) => handleClick(e, "left leg")} />
          <area shape="circle" coords="98,211,17" alt="Right leg" title="Right leg" href="#" onClick={(e) => handleClick(e, "right leg")} />
          <area shape="circle" coords="200,88,34" alt="Back" title="Back" href="#" onClick={(e) => handleClick(e, "back")} />
        </map>
      </div>
      <div className="injury-list">
        <h2>List of Injuries</h2>
        <ul>
          {/* Call the renderInjuries function to display the list */}
          {renderInjuries()}
        </ul>
      </div>

      <button type="button" onClick={()=>{
        console.log(currInjuries);
        makeFinalUpdate();
        }}> Report</button>
        
    </div>
  );
}

export default BodyMap;
