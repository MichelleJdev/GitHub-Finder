export const ACTIONS = {
  GET_USERS: 'GET_USERS',
  GET_USER_AND_REPOS: 'GET_USER_AND_REPOS',
  SET_LOADING: 'SET_LOADING',
  CLEAR_USERS: 'CLEAR_USERS',
}

const githubReducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case ACTIONS.GET_USER_AND_REPOS:
      return {
        ...state,
        user: payload.user,
        repos: payload.repos,
        loading: false,
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
    default:
      return state;
  }
}

export default githubReducer;