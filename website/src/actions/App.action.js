const BASE_URL = process.env.REACT_APP_HOST_API || '127.0.0.1:8000'

export const GET_REPOSITORIES = 'LIST_REPO'
export const GET_REPOSITORIES_FAIL = 'LIST_REPO_FAIL'

export const getRepositories = (owner) => (dispatch) => {
    fetch(`http://${BASE_URL}/repository/${owner}`, {
        method: 'GET',
        mode: 'cors',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data)
            if (!data.error) {
                dispatch({ type: GET_REPOSITORIES, data })
            } else {
                dispatch({ type: GET_REPOSITORIES_FAIL, message: data.error })
            }
        })
        .catch((e) => {
            dispatch({ type: GET_REPOSITORIES_FAIL, message: e.message })
        })
}

export const GET_COMMITS = 'LIST_COMMITS'
export const GET_COMMITS_FAIL = 'LIST_COMMITS_FAIL'

export const getCommits = (owner, app) => (dispatch) => {
    fetch(`http://${BASE_URL}/commits/${owner}/${app}`, {
        method: 'GET',
        mode: 'cors',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data)
            if (data) {
                dispatch({ type: GET_COMMITS, data })
            } else {
                dispatch({
                    type: GET_COMMITS_FAIL,
                    message: 'Une erreur est survenu',
                })
            }
        })
}
