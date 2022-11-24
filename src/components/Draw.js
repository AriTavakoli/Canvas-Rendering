import React, { useEffect, useReducer, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import Buttons from "./Buttons.js";
import modeReducer from "./modeReducer.js";
import { ModeContext, ModeDispatchContext } from './ModeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideBarComponent from './SideBarComponent.js';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import DropDown from './DropDown.js';
import { v4 as uuid } from 'uuid';


const generator = rough.generator();

const theme = createTheme({
  palette: {
    mode: 'light',
    color: 'black'
  },
});


const deletedObj = {};



export default function Draw() {

  const [deleted, setDeleted] = useState([]);

  const [mode, dispatch] = useReducer(
    modeReducer,
    '',
  )
  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState([]);
  const [count, setCount] = useState(0);






  const handleUndo = (event) => {



    const lastElement = elements[elements.length - 1];


    console.log(lastElement, 'lastElement')




    const lastId = lastElement.id;
    console.log(lastId);


    deletedObj[lastId] = lastElement;

    setDeleted((prevState) => [...prevState, lastElement]);







    console.log(lastElement);


    // setDeleted((prevState) => [...prevState, lastElement]);


    setElements(elements.filter(a => a !== lastElement));
    // console.log(count, 'count');
    // setCount(count + 1)
  }

  const handleRedo = (event) => {
    if (deleted.length === 0) {
      return;
    }

    const putBack = deleted[deleted.length - 1];
    console.log(putBack);

    setDeleted(deleted.filter(a => a.id !== putBack.id));
    setElements((prevState) => [...prevState, putBack]);

    console.log(putBack, 'putback')





  }





  // TODO : Create a reducer for Theme, Clear and Delete




  // TODO: Figure out how to make a factory function in another file and mantain its scope.
  function createElement(x1, y1, x2, y2, type, id) {
    let roughElement;

    switch (mode) {


      case "line":
        //  roughElement = generator.line(x1, y1, x2, y2);
        //white line
        roughElement = generator.line(x1, y1, x2, y2,);
        break;
      case "rectangle":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1,);
        break;
      case "ellipse":
        roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1,);
        break;

      case 'diamond':
        console.log('switch diamond')
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2],
          [x1, y1 + (y2 - y1)],
          [x1 - (x2 - x1) / 2, y1 + (y2 - y1) / 2]
        ], type, id);

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

    // ?? Gets returned everytime the function runs.

    return { x1, y1, x2, y2, type, id, roughElement }

  }


  const isWithinBounds = (x, y, element) => {
    const { type, x1, y1, x2, y2 } = element;
    console.log(type, 'type Here');
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

  // !!! --------------------------------------------------------------------





  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY, pageX, pageY } = event;

    const type = mode;

    const id = uuid();

    console.log(mode);

    const element = createElement(pageX, pageY, clientX, clientY, type, id);
    //  console.log(event)
    setElements((prevState) => [...prevState, element]);



  }

  // this gets the previos mouse position state and the current mouse position state and makes the shape in between them.

  const handleMouseMove = (event) => {
    if (!drawing) {
      return;
    }

    const { clientX, clientY } = event;
    // console.log(clientX, clientY);
    const index = elements.length - 1;

    const { x1, y1 } = elements[index];
    const id = uuid();

    const element = createElement(x1, y1, clientX, clientY, mode, id);
    const elementsCopy = [...elements];
    elementsCopy[index] = element;
    setElements(elementsCopy);


  }

  //  ** activation is controlled by setDrawing state.
  const handleMouseUp = (event) => {
    setDrawing(false);
  }







  return (
    <div className='container-all' >

      <button onClick={() => { handleUndo(); }}>sd</button>
      <button onClick={() => { handleRedo(); }}>sd</button>


      <ThemeProvider theme={theme}>
        <ModeContext.Provider value={mode}>
          <ModeDispatchContext.Provider value={dispatch}>

            <div className='nav-bar-holder'>
              <div className='side-button-holder-left'>
                <div className='left-button'>
                  <DropDown></DropDown>
                </div>
              </div>
              <div className='button-holder'>
                <Buttons></Buttons>
              </div>

              <div className='side-button-holder-right'>
                <div className='right-button'>
                  <SideBarComponent></SideBarComponent>
                </div>
              </div>


            </div>


          </ModeDispatchContext.Provider>
        </ModeContext.Provider>





      </ThemeProvider>






      <canvas
        id="canvas"
        width={window.innerWidth}


        background-color='black'
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}


      >{ }</canvas>
    </div>



  )

}