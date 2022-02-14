export const ACTIONS = {
  SET_ALERT: 'SET_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT'
}

const alertReducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.SET_ALERT:
      return payload;
    case ACTIONS.REMOVE_ALERT:
      return null;
    default:
      return state;
  }
}

export default alertReducer;