export const ACTIONS = {
  GET_USERS: 'GET_USERS',
  SET_LOADING: 'SET_LOADING',
  CLEAR_USERS: 'CLEAR_USERS',
}

const githubReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case ACTIONS.CLEAR_USERS:
      return {
        ...state,
        users: []
      }
    default:
      return state;
  }
}

export default githubReducer;