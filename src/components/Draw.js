import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import getStroke from "perfect-freehand";

const generator = rough.generator();




export default function Draw() {

  const [mode, setMode] = useState("");

  function createElement(x1, y1, x2, y2) {






    let roughElement;

    switch (mode) {
      case "line":
      //  roughElement = generator.line(x1, y1, x2, y2);
        //white line
      roughElement = generator.line(x1, y1, x2, y2, {
        stroke: "white",
        strokeWidth: 2,
        strokeWidth: 2,
        roughness: 0,
        bowing: 0,
        fill: "white",
        fillStyle: "solid",
        fillWeight: 1,
        hachureAngle: -41,
        hachureGap: 4,
        simplify: 0,
        strokeSharpness: "sharp",
        seed: 0,







     });


        break;
      case "rectangle":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        break;
      case "ellipse":
        roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1);
        break;

      case 'diamond':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2],
          [x1, y1 + (y2 - y1)],
          [x1 - (x2 - x1) / 2, y1 + (y2 - y1) / 2]
        ]);

        break;


      case 'triangle':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1 - (x2 - x1), y1 + (y2 - y1)]
        ]);
        break;

      case 'pentagon':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1) * 1.5, y1 + (y2 - y1)],
          [x1 - (x2 - x1) * 0.5, y1 + (y2 - y1)],
          [x1 - (x2 - x1), y1]
        ]);
        break;

      case 'hexagon':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1) * 1.5, y1 + (y2 - y1) / 2],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1)],
          [x1 - (x2 - x1) * 0.5, y1 + (y2 - y1) / 2]
        ]);
        break;

      case 'octagon':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1), y1 + (y2 - y1) / 2],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1) / 2]
        ]);
        break;

      case 'database':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1) * 0.75, y1 + (y2 - y1) / 2],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1)],
          [x1 + (x2 - x1) * 0.25, y1 + (y2 - y1) / 2]
        ]);
        break;



      case "X":
        roughElement = generator.path("M " +
          x1 + " " + y1 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x2 + " " + y2 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x1 + " " + y2 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x2 + " " + y1 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x1 + " " + y1); break



      default:
        roughElement = generator.line(x1, y1, x2, y2);
        break;

    };



    return { x1, y1, x2, y2, roughElement }

  }

  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState([]);

  useLayoutEffect(() => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    const rect = generator.rectangle(0, 0, 100, 100);
    roughCanvas.draw(rect);
    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));


  }, [elements]);


  // this function is called when the user starts drawing, with MOUSE_DOWN event
  // It sends the coordinates of the mouse to the function that creates the element


  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;

    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);





  }

  // this gets the previos mouse position state and the current mouse position state and makes the shape in between them.

  const handleMouseMove = (event) => {
    if (!drawing) {
      return;
    }

    const { clientX, clientY } = event;
    console.log(clientX, clientY);
    const index = elements.length - 1;

    const { x1, y1 } = elements[index];

    const element = createElement(x1, y1, clientX, clientY);
    const elementsCopy = [...elements];
    elementsCopy[index] = element;
    setElements(elementsCopy);


  }

  //  ** activation is controlled by setDrawing state.
  const handleMouseUp = (event) => {
    setDrawing(false);
  }


  return (
    <>
      <button onClick={() => { setElements([]) }}> Clear</button>

      <button onClick={() => { setMode("arrow") }}> Arrow</button>

      <button onClick={() => { setMode("X") }}> X</button>

      <button onClick={() => { setMode("curvedArrow") }}> curvedArrow</button>

      <button onClick={() => { setMode("diamond") }}> Diamond</button>

      <button onClick={() => { setMode("triangle") }}> Triangle</button>

      <button onClick={() => { setMode("pentagon") }}> Pentagon</button>

      <button onClick={() => { setMode("hexagon") }}> Hexagon</button>

      <button onClick={() => { setMode("octagon") }}> Octagon</button>

      <button onClick={() => { setMode("databases") }}> Star</button>

      <button onClick={() => { setMode("heart") }}> Heart</button>









      <button onClick={() => { setMode("ellipse") }}> ellipse</button>
      <button onClick={() => { setMode('rectangle') }}> Rec </button>
      <button onClick={() => { setMode('line') }}> Line </button>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}


      >Canvas</canvas>
    </>

  )

}