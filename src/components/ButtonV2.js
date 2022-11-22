import modeReducer from "./modeReducer.js";
import { useReducer } from "react";
import { ModeContext, ModeDispatchContext } from './ModeContext';
import { useContext } from 'react';




export default function ButtonsV2() {
  const dispatch = useContext(ModeDispatchContext)
  const mode = useContext(ModeContext)
  return (
    <div>

    <button onClick = {()=> {dispatch({type : 'diamond'})}}> test</button>

    </div>
  );
}