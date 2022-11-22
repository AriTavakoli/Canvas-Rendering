import React, { useEffect, useReducer, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import getStroke from "perfect-freehand";
import Buttons from "./Buttons.js";
import CustomizedSwitches from "./Darkmode.js";
import modeReducer from "./modeReducer.js";
import { ModeContext, ModeDispatchContext } from './ModeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import elementFactory from  './ElementFactory.js';

const generator = rough.generator();

const theme = createTheme({
  palette: {
    mode: 'light',
    color: 'black'
  },
});




export default function Draw() {

  const [mode, dispatch] = useReducer(
    modeReducer,
    '',
  )

    // TODO : Create a reducer for Theme, Clear and Delete
    

  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState([]);


  const [themeSettings, setThemeSettings] = useState('dark');




// TODO: Figure out how to make a factory function in another file and mantain its scope.
  function createElement(x1, y1, x2, y2) {
    let roughElement;

    switch (mode) {
      case "line":
        //  roughElement = generator.line(x1, y1, x2, y2);
        //white line
        roughElement = generator.line(x1, y1, x2, y2);
        break;
      case "rectangle":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        break;
      case "ellipse":
        roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1);
        break;

      case 'diamond':
        console.log('switch diamond')
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
          x1 + " " + y1 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x2 + " " + y2 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x1 + " " + y2 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x2 + " " + y1 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x1 + " " + y1);
        break



      default:
        roughElement = generator.line(x1, y1, x2, y2);
        break;

    };



    return { x1, y1, x2, y2, roughElement }

  }



  useLayoutEffect(() => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);


    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));


  }, [elements]);


  // this function is called when the user starts drawing, with MOUSE_DOWN event
  // It sends the coordinates of the mouse to the function that creates the element

  const handleThemeSettings = (event) => {

    console.log('hi')
    console.log(theme)
    setThemeSettings(theme);
  }




  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY, pageX, pageY } = event;

    const element = createElement(pageX, pageY, clientX, clientY);
    console.log(event)
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

      <ThemeProvider theme={theme}>
        <div style={{
          position: 'relative',


        }}>


          <ModeContext.Provider value={mode}>
            <ModeDispatchContext.Provider value={dispatch}>

              <div style={{
                position: 'absolute',
                direction: 'horizontal',
                justifyContent: 'center',
                display: 'block',
                top: '0px',
                left: '0px',
                right: '0px',
                width: '100%',
              }}>
                <Buttons handleThemeSettings={handleThemeSettings}></Buttons>
              </div>
              <canvas
                id="canvas"
                width={window.innerWidth}


                background-color='black'
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}


              >{ }</canvas>

            </ModeDispatchContext.Provider>
          </ModeContext.Provider>
        </div>
      </ThemeProvider>
    </>



  )

}