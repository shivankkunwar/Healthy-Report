
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/RC.css";
const ReportCard = () => {


  const location = useLocation();

  // Get the injuries array from the state prop of the location object
  const Name =location.state?.Name;
  const Date = location.state?.Date;
  const Time = location.state?.Time;
  const Injuries = location.state?.injuries;
  //integrating circles on image as per the report

  const canvasRef = useRef(null);
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
  const drawCircle = (x, y, r, color, number) => {
    // Get the canvas context object
    const ctx = canvasRef.current.getContext("2d");
    // Start a new path
    ctx.beginPath();
    // Draw an arc with the given coordinates, radius, and angle
    ctx.arc(x, y, r, 0, Math.PI * 2);
    // Fill the circle with the given color
    ctx.fillStyle = color;
    ctx.fill();
    // Stroke the circle with a black border
    ctx.strokeStyle = "black";
    ctx.stroke();
    // Draw the number inside the circle with a white font
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(number, x - r / 2, y + r / 2);
  };

  useEffect(() => {
    // Loop through the circles array and call the draw function for each circle
    for (let Injury of Injuries) {
      drawCircle(Injury.x, Injury.y, 20, getRandomColor(), Injury.number);
    }
  });

  return (
    <div>
      <h1>Reporting User Name :{Name}</h1>
      <h2>Date :{Date} </h2>
      <h2> Time : {Time}</h2>
      <div className="report-image">
        <canvas
          className="report-canvas"
          ref={canvasRef}
          width="284"
          height="298"
        />
        <img src="Sbody.png" alt="Body" useMap="#body-map" />
      </div>

      <div>
        {Injuries.map((injury) => {
          <li key={injury.number}>
            <label htmlFor={`injury-${injury.number}`}>
              Injury {injury.number} on {injury.area}
            </label>

            <h2>{injury.details}</h2>
          </li>;
        })}
      </div>
    </div>
  );
};

export default ReportCard;
