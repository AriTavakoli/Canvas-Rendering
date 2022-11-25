
import React, { useEffect, useReducer, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import getStroke from "perfect-freehand";
import Buttons from "./Buttons.js";
import CustomizedSwitches from "./Darkmode.js";
import modeReducer from "./modeReducer.js";
import { ModeContext, ModeDispatchContext } from './ModeContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import elementFactory from './ElementFactory.js';
import SideBar from './Sidebar.js';
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import close from './icons/close.svg';
import library from './icons/library.svg';
import ToggleButton from '@mui/material/ToggleButton';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import upload from './icons/upload.webp';


export default function SideBarComponent({ handleLocalStorage, elements, handleForce }) {
  const [isShown, setShown] = useState(false);

  const [count, setCount] = useState(0);





  const mapped = Object.keys(localStorage).map((item) => {

    console.log(item, 'item');

    return (
      <div className="local-row">
        {item}
        <img onClick={() => { handleForce(); handleLocalStorage(item) }} src={upload} width='100px' alt="uploadImage"></img>

      </div>
    )
  })

  const handleSave = () => {


    var name = prompt("ID name", "ID");
    //display the current date and time
    var now = new Date();
    var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();


    const objWrapper = { elements };

    localStorage.setItem(name, JSON.stringify(objWrapper));

    console.log(localStorage)



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