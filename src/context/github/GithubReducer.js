export const ACTIONS = {
  GET_USERS: 'GET_USERS',
  GET_USER: 'GET_USER',
  SET_LOADING: 'SET_LOADING',
  CLEAR_USERS: 'CLEAR_USERS',
  GET_REPOS: 'GET_REPOS'
}

const githubReducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case ACTIONS.GET_USER:
      return {
        ...state,
        loading: false,
        user: payload
      }
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case ACTIONS.CLEAR_USERS:
      return {
        ...state,
        users: []
      }
    case ACTIONS.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      }
    default:
      return state;
  }
}

export default githubReducer;