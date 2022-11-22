

export default function themeReducer(state, action) {

  switch (action.type) {
    case 'light':
      return action.type
    case 'dark':
      return action.type
    default:
      return state

  }
};