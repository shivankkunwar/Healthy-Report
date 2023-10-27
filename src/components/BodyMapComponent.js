import React, { useState, useRef, useEffect } from "react";
import "./styles/BMC.css";
import { useNavigate } from "react-router-dom";
import { imageMapResize } from 'imagemap-resizer';
function BodyMap({ updateInjuries }) {
  const [currInjuries, setCurrInjuries] = useState([]);
  const [finalReport, setFinalReport] = useState("");
  const [circles, setCircles] = useState([]);

  const canvasRef = useRef(null);

 

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

  const isInsideCircle = (x, y, cx, cy, r) => {
    const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

    return distance <= r;
  };

  const handleClick = (e, area) => {
    e.preventDefault();

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    for (let circle of circles) {
      if (isInsideCircle(x, y, circle.x, circle.y, circle.r)) {
        return;
      }
    }

    setCurrInjuries((prevInjuries) => [
      ...prevInjuries,
      {
        number: prevInjuries.length + 1,
        area: area,
        details: "",
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      },
    ]);

    setCircles((prevCircles) => [
      ...prevCircles,
      {
        x: x,
        y: y,
        r: 20,
        color: getRandomColor(),
        number: prevCircles.length + 1,
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    setCurrInjuries((prevInjuries) => {
      const newInjuries = [...prevInjuries];
      newInjuries[index] = {
        ...newInjuries[index],
        details: value,
      };
      return newInjuries;
    });
  };

  const renderInjuries = () => {
    return currInjuries.map((injury, index) => (
      <li key={injury.number}>
        <div className="injury-flex">
          <label htmlFor={`injury-${injury.number}`}>
            Injury {injury.number} on {injury.area}
          </label>

          <input
            id={`injury-${injury.number}`}
            type="text"
            placeholder="Explain more about the injury"
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      </li>
    ));
  };

  const getRandomColor = () => {
    const values = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += values[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  useEffect(() => {
    for (let circle of circles) {
      drawCircle(circle.x, circle.y, circle.r, circle.color, circle.number);
    }
  }, [circles]);

  const makeFinalUpdate = () => {
    console.log("updating the curr injury list");
  };

  useEffect(() => {
    updateInjuries(currInjuries);
  }, [currInjuries]);
  return (
    <div className="container">
      <h1>Body Map</h1>
      <p>Click on different areas of the body to report injuries.</p>
     
      <div className="inner-container">
        <div className="image-map">
          <canvas className="canvas" ref={canvasRef} width="284" height="298" />
          <img src="Sbody.png" alt="Body" useMap="#body-map" />

          <map name="body-map">
            <area
              className=""
              shape="circle"
              coords="76,31,19"
              alt="Head"
              title="Head"
              href="#"
              onClick={(e) => handleClick(e, "head")}
            />
            <area
              shape="circle"
              coords="35,123,24"
              alt="Left hand"
              title="Left hand"
              href="#"
              onClick={(e) => handleClick(e, "left hand")}
            />
            <area
              shape="circle"
              coords="76,74,15"
              alt="Chest"
              title="Chest"
              href="#"
              onClick={(e) => handleClick(e, "chest")}
            />
            <area
              shape="circle"
              coords="116,120,23"
              alt="Right hand"
              title="Right hand"
              href="#"
              onClick={(e) => handleClick(e, "right hand")}
            />
            <area
              shape="circle"
              coords="60,211,16"
              alt="Left leg"
              title="Left leg"
              href="#"
              onClick={(e) => handleClick(e, "left leg")}
            />
            <area
              shape="circle"
              coords="98,211,17"
              alt="Right leg"
              title="Right leg"
              href="#"
              onClick={(e) => handleClick(e, "right leg")}
            />
            <area
              shape="circle"
              coords="200,88,34"
              alt="Back"
              title="Back"
              href="#"
              onClick={(e) => handleClick(e, "back")}
            />
          </map>
        </div>
        <div className="injury-list">
          <h2>List of Injuries</h2>
          <ul>{renderInjuries()}</ul>
        </div>
        
      </div>
    </div>
  );
}

export default BodyMap;
