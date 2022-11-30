import { ModeContext, ModeDispatchContext } from '../ModeContext';
import modeReducer from "../modeReducer.js";
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DropDown from './DropDown.js';
import Buttons from "./Buttons.js";
import SideBarComponent from './SideBarComponent.js';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import '../../App.css';


export default function NavBar({ mode, dispatch, handleLocalStorage, handleClear, handleUndo, handleRedo, handleForce, stage, elements }) {

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

                <Buttons handleLocalStorage={handleLocalStorage} handleClear={handleClear}></Buttons>

              </div>
              <div className='side-button-holder-right'>
                <div className='right-button'>
                  <SideBarComponent handleForce={handleForce} handleLocalStorage={handleLocalStorage} stage={stage} elements={elements}></SideBarComponent>
                </div>
              </div>
            </div>


            <ToggleButtonGroup className='undo-redo'>

              <ToggleButton onClick={() => { handleUndo(); }}>
                <UndoOutlinedIcon ></UndoOutlinedIcon>

              </ToggleButton>


              <ToggleButton onClick={() => { handleRedo() }}>
                <RedoOutlinedIcon> </RedoOutlinedIcon>
              </ToggleButton>

            </ToggleButtonGroup>



          </ModeDispatchContext.Provider>
        </ModeContext.Provider>

      </div>

    </>
  )

}