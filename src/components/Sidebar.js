
import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import '../App.css';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ToggleButton from '@mui/material/ToggleButton';
import Paper from '@mui/material/Paper';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';





export default function SideBar({ handleSideBar }) {
  const [open, cycleOpen] = useCycle(false, true);

  const [isShown, setShown] = React.useState(false);







  return (

    <>

      <button onClick={() => { setShown(!isShown); handleSideBar() }} className="close-button">sd</button>

      <AnimatePresence>
        {isShown && (
          <div className="sidebarContainer">

            <motion.div
              className="sidebar"
              initial={{
                opacity: 0,
                x: 0,
              }}

              exit={{
                width: 0,
                transition: { delay: 0, duration: 0.2 }
              }}

              animate={{ x: -100, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: .4, }}
            >


            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>


  );
}
