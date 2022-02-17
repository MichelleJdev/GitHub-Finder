import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import Alert from '../layout/Alert';
import { searchUsers } from '../../context/github/GithubActions';
import { ACTIONS } from '../../context/github/GithubReducer';

const { GET_USERS, SET_LOADING, CLEAR_USERS } = ACTIONS;

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const { users, dispatch } = useContext(GithubContext);

  const { setAlert } = useContext(AlertContext);

  const handleChange = evt => setSearchTerm(evt.target.value);

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (!searchTerm.length) {
      setAlert('Please enter a search term', 'error')
    } else {
      dispatch({
        type: SET_LOADING,
        payload: true
      })

      const users = await searchUsers(searchTerm);

      dispatch({
        type: GET_USERS,
        payload: users
      });
      setSearchTerm('');
    }
  }

  const handleClear = () => {
    dispatch({
      type: CLEAR_USERS
    });
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
      <Alert />
        <form action="" onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                onChange={handleChange}
                value={searchTerm}
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search" />
              <button
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                type="submit"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      {users.length > 0 && (
          <div>
          <button
            onClick={handleClear}
            className="btn btn-ghost btn-lg">
              Clear
            </button>
          </div>
        )}
    </div>
  )
}

export default UserSearch
