import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import { ACTIONS } from '../github/GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async term => {
    setLoading(true);

    const params = new URLSearchParams({
      q: term
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    const {items} = await response.json();
    dispatch({
      type: ACTIONS.GET_USERS,
      payload: items
    })
    
  }

  // Clear Users
  const clearUsers = () => dispatch({
      type: ACTIONS.CLEAR_USERS
  })
  
  // Get single user
  const getUser = async login => {
    setLoading(true);

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      dispatch({
        type: ACTIONS.GET_USER,
        payload: data
      })
    }
  }

  // Get user repos
  const getRepos = async login => {
    setLoading(true);

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    const data = await response.json();
    dispatch({
      type: ACTIONS.GET_REPOS,
      payload: data
    })
    
  }

  const setLoading = bool => dispatch({type: ACTIONS.SET_LOADING, payload: bool})

  return (
    <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      getUser,
      clearUsers,
      getRepos
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext;