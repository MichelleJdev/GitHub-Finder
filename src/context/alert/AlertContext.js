import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';
import { ACTIONS } from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const initialState = null
  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (message, type) => {
    dispatch({
      type: ACTIONS.SET_ALERT,
      payload: {
        type,
        message
      }
    })

    setTimeout(() => dispatch({
      type: ACTIONS.REMOVE_ALERT
    }), 3000)
  }
  
  return (
    <AlertContext.Provider value={{
      alert: state,
      setAlert,
    }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext;