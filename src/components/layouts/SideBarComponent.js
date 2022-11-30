
import React, { useEffect, useReducer, useLayoutEffect, useRef,memo, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import getStroke from "perfect-freehand";
import Buttons from "./Buttons.js";

import modeReducer from "../modeReducer.js";
import { ModeContext, ModeDispatchContext } from '../ModeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';


export default function SideBarComponent({ handleLocalStorage, elements, handleForce, stage }) {

  const [isShown, setShown] = useState(false);

  const [count, setCount] = useState(0);




  const mapped = Object.keys(localStorage).map((item) => {

    let parsedItem = JSON.parse(localStorage.getItem(item))

    // !! catching JSON parse

    let url = parsedItem[1].dataUrl

    return (
      <div className="local-row">
        {item}
        <img onClick={() => { handleForce(); handleLocalStorage(item) }} src={url} className = "uploadImage" width='100px' alt="uploadImage"></img>
      </div>
    )
  })




  const handleSave = () => {

    var name = prompt("ID name", "ID");
    //display the current date and time
    const dataUrl = stage.toDataURL({ pixelRatio: 1 });

    const objWrapper = [{ elements }, { dataUrl }];

    localStorage.setItem(name, JSON.stringify(objWrapper));

  }


  return (
    <>

      <ToggleButton onClick={() => { setShown(!isShown); }} >
        <LocalLibraryOutlinedIcon style={{ fontSize: 20, }} > </LocalLibraryOutlinedIcon>
      </ToggleButton>
      <AnimatePresence>
        {isShown && (
          <div >
            <motion.div
              layout
              className="side-bar"
              initial={{
                opacity: 0,
                x: 0,
                hidden: true,
              }}
              animate={{ x: '-0%', opacity: 1, hidden: false, }}
              exit={{
                x: 0,
                transition: { ease: 'easeOut', duration: 0.2, },
                hidden: true,
                opacity: 0,


              }}
              transition={{ ease: 'linear', duration: .2, }}
            >
              <motion.div className="close-button-container">
                <ToggleButton onClick={() => { setShown(!isShown); }}>
                  <CloseIcon style={{ fontSize: 20, }}></CloseIcon>
                </ToggleButton>
                {/*
                <ToggleButton>
                  <LocalLibraryOutlinedIcon style={{ fontSize: 20, }} > </LocalLibraryOutlinedIcon>
                </ToggleButton> */}


              </motion.div>




              <div className="local-container">
                <div>
                  <button onClick={() => { handleSave(); setCount(1) }}>Save</button>
                </div>

                <div className="local-row">
                  <h4> Recently Saved</h4>
                </div>


                {mapped}


              </div>
            </motion.div>


          </div>
        )}
      </AnimatePresence>

    </>
  )

}