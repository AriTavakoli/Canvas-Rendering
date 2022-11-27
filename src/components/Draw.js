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
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import Modal from './Modal.js';
import upload from './icons/upload.webp';
import Konva from 'konva';




// TODO: Create a reducer for save items,


const generator = rough.generator();


export default function Draw() {

  const [deleted, setDeleted] = useState([]);

  const [mode, dispatch] = useReducer(
    modeReducer,
    '',
  )

  const stageRef = useRef('stage1');



  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState([]);

  const [force, setForce] = useState(1);


  const handleForce = (e) => {
    setForce(1);
  }




  const handleLocalStorage = (item) => {
    const setable = JSON.parse(localStorage.getItem(item));
    console.log(setable, 'setable')
    setElements(setable.elements);

  }





  const handleClear = () => {
    setElements([]);
  }



  const handleUndo = (event) => {
    if (elements.length === 0) {
      return;

    } else {

      const lastElement = elements[elements.length - 1];

      setDeleted((prevState) => [...prevState, lastElement]);

      setElements(elements.filter(a => a !== lastElement));
    }
  }

  const handleRedo = (event) => {
    if (deleted.length === 0) {
      return 1;
    }
    const putBack = deleted[deleted.length - 1];
    setDeleted(deleted.filter(a => a.id !== putBack.id));
    setElements((prevState) => [...prevState, putBack]);

  }


  const nearPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
  };



  const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));



  const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < maxDistance ? "inside" : null;
  };



  const positionWithinElement = (x, y, element) => {
    const { type, x1, x2, y1, y2 } = element;
    switch (type) {
      case "line":
        const on = onLine(x1, y1, x2, y2, x, y);
        const start = nearPoint(x, y, x1, y1, "start");
        const end = nearPoint(x, y, x2, y2, "end");
        return start || end || on;
      case "rectangle":
        const topLeft = nearPoint(x, y, x1, y1, "tl");
        const topRight = nearPoint(x, y, x2, y1, "tr");
        const bottomLeft = nearPoint(x, y, x1, y2, "bl");
        const bottomRight = nearPoint(x, y, x2, y2, "br");
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        return topLeft || topRight || bottomLeft || bottomRight || inside;
      case "pencil":
        const betweenAnyPoint = element.points.some((point, index) => {
          const nextPoint = element.points[index + 1];
          if (!nextPoint) return false;
          return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null;
        });
        return betweenAnyPoint ? "inside" : null;
      case "text":
        return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      default:
        throw new Error(`Type not recognised: ${type}`);
    }
  };



  const getElementAtPosition = (x, y, elements) => {
    return elements
      .map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
      .find(element => element.position !== null);
  };



  // TODO : Create a reducer for Theme, Clear and Delete


  function createElement(id, x1, y1, x2, y2, type,) {
    let roughElement;

    let ctx = document.getElementById("canvas").getContext("2d");


    let element;

    switch (mode) {

      case "line":
        element = ctx.line(x1, y1, x2, y2,);
        break;

      case "rectangle":
        element = ctx.rectangle(x1, y1, x2 - x1, y2 - y1,);
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


    return { x1, y1, x2, y2, type, id, roughElement , element}

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

  const handleMouseDown = (event) => {

    const { clientX, clientY, pageX, pageY } = event;
    if (mode === 'selection') {

      console.log(getElementAtPosition(clientX, clientY, elements), 'yowhat up ');
      return;
    } else {

      setDrawing(true);

      const type = mode;

      const id = uuid();



      const element = createElement(id, pageX, pageY, clientX, clientY, type);
      //  console.log(event)
      setElements((prevState) => [...prevState, element]);


    }


  }

  // this gets the previos mouse position state and the current mouse position state and makes the shape in between them.

  const handleMouseMove = (event) => {
    if (!drawing || mode === 'selection') {
      return;
    }

    const { clientX, clientY } = event;
    // console.log(clientX, clientY);
    const index = elements.length - 1;

    const { x1, y1 } = elements[index];
    const id = uuid();


    const updatedElement = createElement(id, x1, y1, clientX, clientY, mode);
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);

  }



  //  ** activation is controlled by setDrawing state.
  const handleMouseUp = (event) => {
    setDrawing(false);
  }


  return (
    <div className='container-all' >


      <ModeContext.Provider value={mode}>
        <ModeDispatchContext.Provider value={dispatch}>
          <div className='nav-bar-holder'>
            <div className='side-button-holder-left'>
              <div className='left-button'>
                <DropDown></DropDown>
              </div>
            </div>
            <div className='button-holder'>
              <Buttons handleLocalStorage={handleLocalStorage} handleClear={handleClear}></Buttons>
            </div>
            <div className='side-button-holder-right'>
              <div className='right-button'>
                <SideBarComponent handleForce={handleForce} handleLocalStorage={handleLocalStorage} elements={elements}></SideBarComponent>
              </div>
            </div>

          </div>
          <ToggleButtonGroup className='undo-redo'>

            <ToggleButton onClick={() => { handleUndo(); }}>
              <UndoOutlinedIcon ></UndoOutlinedIcon>
            </ToggleButton>

            <ToggleButton onClick={() => { handleRedo() }}>
              <RedoOutlinedIcon>

              </RedoOutlinedIcon>
            </ToggleButton>

          </ToggleButtonGroup>



        </ModeDispatchContext.Provider>
      </ModeContext.Provider>

      <canvas
        id="canvas"
        width={window.innerWidth}


        background-color='black'
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}


      >{ }</canvas>
    </div >



  )

}