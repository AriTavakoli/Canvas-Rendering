

import { useEffect, useReducer, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";
import { AnimatePresence, AnimateSharedLayout, motion, useCycle } from "framer-motion";
import ToggleButton from '@mui/material/ToggleButton';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Modal({ }) {
  const [isShown, setShown] = useState(false);


  const handleModal = () => {




  }


  return (
    <>

      <ToggleButton onClick={() => { setShown(!isShown); handleModal(); }}>
        <ReorderOutlinedIcon style={{ fontSize: 20, }} />
      </ToggleButton>
      <AnimatePresence>
        {isShown && (

          <motion.div
            layout
            className='modal'
            initial={{
              opacity: 0,
              y: 0,
              hidden: true,
            }}
            animate={{
              opacity: 1,
              y: '3%',
              hidden: false,

            }}
            exit={{
              opacity: 0,
              y: 0,
              transition: { ease: 'easeIn', duration: 0.2, },
              hidden: true,
            }}
          >

            <motion.div className='drop-down-container'>

              <ToggleButton style={{ paddingTop: '0px', justifyContent: 'center', paddingBottom: '0px', paddingRight: '0px', paddingLeft: '0px', alignItems: "center", width: '100%', justifyContent: 'space-between', border: 'none' }}>
                <div className='drop-down-row'>
                  <div className="logo-word">
                    <FolderOpenOutlinedIcon style={{ fontSize: 20, }} ></FolderOpenOutlinedIcon>
                    <text className='drop-down-text'>Open</text>
                  </div>
                  <text className='drop-down-text'>ctrl + shift</text>
                </div>
              </ToggleButton>

              <ToggleButton style={{ paddingTop: '0px', paddingBottom: '0px', padding: '0px', width: '100%', justifyContent: 'start', border: 'none' }}>
                <div className='drop-down-row'>
                  <div className="logo-word">
                    <SaveAltOutlinedIcon style={{ fontSize: 20, }} ></SaveAltOutlinedIcon>
                    <text className='drop-down-text'>save</text>
                  </div>
                  <text className='drop-down-text'>ctrl + shift</text>
                </div>
              </ToggleButton>
              <ToggleButton style={{ paddingTop: '0px', paddingBottom: '0px', paddingRight: '0px', paddingLeft: '0px', width: '100%', justifyContent: 'space-between', border: 'none', }}>
                <div className='drop-down-row-two'>
                  <div className="logo-word">
                    <DeleteOutlineOutlinedIcon style={{ fontSize: 20, }} ></DeleteOutlineOutlinedIcon>
                    <text className='drop-down-text'> reset the canvas</text>
                  </div>
                </div>
              </ToggleButton>



            </motion.div>
          </motion.div>

        )}
      </AnimatePresence>


    </>
  )

}