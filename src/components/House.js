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
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';



export default function House() {
  const stageRef = useRef('stage1');
  const layerRef = useRef('layer1');

  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState([]);

  const [transformers, setTransformers] = useState([]);


  const [deleted, setDeleted] = useState([]);
  const [mode, dispatch] = useReducer(
    modeReducer,
    '',
  )


  let layer = layerRef.current;
  let stage = stageRef.current

  let element;

  const createElement = (x, y) => {

    switch (mode) {
      case 'clear':
        console.log('clear')
        setElements([]);
        break;

      case 'selection':
        return
      case 'rectangle':
        element = new Konva.Rect({
          x: x,
          y: y,
          stroke: 'black',
          strokeWidth: 5,
          draggable: true,
          id: uuid()
        });
        return element;



      default:
        element = new Konva.Ellipse({
          x: stage.getPointerPosition().x,
          y: stage.getPointerPosition().y,
          radiusX: 50,
          radiusY: 50,
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          id: uuid()

        })




        return element;


    };

  }

  useLayoutEffect(() => {
    if (mode === 'selection') {
      const tr = new Konva.Transformer({
        node: element,
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        rotateEnabled: false,
        boundBoxFunc: function (oldBox, newBox) {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }
      });
      layer.add(tr);
      tr.attachTo(element);
      layer.draw();
      setTransformers([...transformers, tr]);
    }



  },[transformers]);


  const addTransform = (element) => {

    element.on('click', () => {
      console.log('click')

      let
        tr = new Konva.Transformer({
          node: element,
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          rotateEnabled: true,

          borderStroke: 'black',
          borderStrokeWidth: 2,
          anchorStroke: 'black',
          anchorStrokeWidth: 2,
          anchorFill: 'white',
          anchorSize: 10,
          keepRatio: false,
          ignoreStroke: true,
          boundBoxFunc: function (oldBox, newBox) {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }
        });
      layer.add(tr);
    })
  };




  const handleMouseUp = () => {
    setIsDrawing(false);

  }

  const handleLocalStorage = (item) => {
    const setable = JSON.parse(localStorage.getItem(item));
    console.log(setable, 'setable')
    setElements(setable.elements);

  }

  const handleClear = () => {
    console.log('clear')
    setElements([]);
    stage.clearCache();
    layer.clearCache();
    stage.clear();
    layer.destroy()

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




  const handleMouseMove = (event) => {
    if (!isDrawing || mode === 'selection') return;
    var updatedElement = elements[elements.length - 1];

    const updatedX = updatedElement.attrs.x;
    const updatedY = updatedElement.attrs.y;


    console.log(updatedX, updatedY, 'updatedX, updatedY')



    console.log(updatedElement, 'updatedElement')

    const newWidth = stageRef.current.getPointerPosition().x - updatedElement.x();
    const newHeight = stageRef.current.getPointerPosition().y - updatedElement.y();

    updatedElement.width(newWidth);
    updatedElement.height(newHeight);


  }



  const handleMouseDown = () => {
    if (mode === 'selection') return;


    setIsDrawing(true);
    let { x, y } = stage.pointerPos;

    console.log(x, y, 'xasdasda, y')

    const element = createElement(x, y);


    layer.add(element);
    stage.add(layer);
    setElements(prevState => [...prevState, element]);

  }


  var x1, y1, x2, y2;

  const handleClick = (e) => {
    if (mode === 'selection') {

      let currentShape;

      // get element clicked on
      var clickedOn = e.target;


      // if clicked on empty area - remove all transformers

      if(clickedOn === stage){
        setTransformers([]);
        return;
      } else {
        addTransform(clickedOn);

      }



    }


    console.log({ layer });
    console.log({ stage });



    // var tr = new Konva.Transformer();
    // layer.add(tr);
    // tr.nodes([rect]);
    // console.log('sd')
    // console.log(stage);

  }





  return (
    <>

      <div className='container-all'  >


        <ModeContext.Provider stye={{ zIndex: "5" }} value={mode}>
          <ModeDispatchContext.Provider value={dispatch}>
            <div className='nav-bar-holder'>
              <div className='side-button-holder-left'>
                <div className='left-button'>
                  <DropDown></DropDown>
                </div>
              </div>
              <div className='button-holder'>
                <Buttons handleLocalStorage={handleLocalStorage} handleClear1={handleClear}></Buttons>
              </div>
              <div className='side-button-holder-right'>
                <div className='right-button'>
                  <SideBarComponent handleLocalStorage={handleLocalStorage} elements={elements}></SideBarComponent>
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

      </div>


      <Stage style={{ zIndex: '-1' }} width={window.innerWidth} height={window.innerHeight} ref={stageRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onClick={handleClick} >

        <Layer ref={layerRef}></Layer>

      </Stage>
    </>
  );
};

