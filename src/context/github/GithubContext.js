import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import { ACTIONS } from '../github/GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (term) => {
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



  const setLoading = (bool) => {
    dispatch({type: ACTIONS.SET_LOADING, payload: bool})
  }

  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      searchUsers
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext;