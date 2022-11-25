
import {useReducer} from 'react';


export default function modeReducer(state, action) {
  switch (action.type) {
    case 'selection':
      return action.type
    case 'X':
      return action.type
    case 'line':
      return action.type
    case 'rectangle':
      return action.type
    case 'ellipse':
      return action.type
    case 'diamond':
      console.log('clicked')
      return action.type
    case 'triangle':
      return action.type
    case 'hexagon':
      return action.type
    case 'arrow':
      return action.type
    case 'text':
      return action.type
    case 'select':
      return action.type
    case 'delete':
      return action.type
    case 'clear':
      return []

    default:
      return state
  }
}
