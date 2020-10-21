const intialState = {
	commits: [],
  list: [],
  errorMessage: null
}
const repositories = (state = intialState, action) => {
	console.log('action',action)
  switch (action.type) {
    case 'LIST_REPO':
      return {
        ...state,
	      list: action.data,
      }
    case 'LIST_REPO_FAIL':
      return {
        ...state,
        errorMessage: action.message
      }
    case 'LIST_COMMITS':
      return {
        ...state,
        commits: action.data
      }
    case 'LIST_COMMITS_FAIL':
      return {
        ...state,
        errorMessage: action.message
      }

    default:
      return state
  }
}

export default repositories
