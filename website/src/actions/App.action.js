const BASE_URL = `http://${process.env.REACT_APP_HOST_API}`

export const GET_REPOSITORIES = 'LIST_REPO';
export const GET_REPOSITORIES_FAIL = 'LIST_REPO_FAIL';

export const getRepositories = (owner) => dispatch => {
  fetch(`${BASE_URL}/repository/${owner}`, {
    method: 'GET',
	  mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
	    console.log("data",data)
      if (data) {
        dispatch({ type: GET_REPOSITORIES, data });
      } else {
        dispatch({ type: GET_REPOSITORIES_FAIL, message: 'Une erreur est survenu' });
      }
    });
}

export const GET_COMMITS = 'LIST_COMMITS';
export const GET_COMMITS_FAIL = 'LIST_COMMITS_FAIL';

export const getCommits = (owner, app) => dispatch => {
  fetch(`${BASE_URL}/commits/${owner}/${app}`, {
    method: 'GET',
	  mode: 'cors',
  })
    .then(response => response.json())
    .then(data => {
	    console.log("data",data)
      if (data) {
        dispatch({ type: GET_COMMITS, data });
      } else {
        dispatch({ type: GET_COMMITS_FAIL, message: 'Une erreur est survenu' });
      }
    });
}


