import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/RC.css";
const ReportCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const { name, date, time, injuries } = location.state;

  const canvasRef = useRef(null);
  const getRandomColor = () => {
    const values = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += values[Math.floor(Math.random() * 16)];
    }

    return color;
  };
  const drawCircle = (x, y, r, color, number) => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();

    ctx.arc(x, y, r, 0, Math.PI * 2);

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(number, x - r / 2, y + r / 2);
  };

  useEffect(() => {
    for (let Injury of injuries ?? []) {
      drawCircle(Injury.x, Injury.y, 20, getRandomColor(), Injury.number);
    }
  });

  return (
    <div>
      <button className="button-back" onClick={() => navigate(-1)}> back </button>
      <div className="content-container">
        <h1>Reporting User Name : {name}</h1>
        <h2>Date : {new Date(date).toLocaleDateString()} </h2> 
        <h2> Time : {time}</h2>
        
        </div>
        <div className="description">
         
        <div className="report-image">
          <canvas
            className="report-canvas"
            ref={canvasRef}
            width="284"
            height="298"
          />
          <img src="Sbody.png" alt="Body" useMap="#body-map" />
        </div>
          <div className="injury-about">
          {injuries.map((injury) => (
            <div key={injury.number}>
              <label htmlFor={`injury-${injury.number}`}>
                Injury {injury.number} on {injury.area}
              </label>

              <h3>{injury.details}</h3>
            </div>
          ))}
          </div>
          
        </div>
      </div>
    
  );
};

export default ReportCard;
