const intialState = {
	commits: [],
	list: [],
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
	errorMessage: action.errorMessage
      }
    case 'LIST_COMMITS':
      return {
	...state,
	commits: action.data
      }
    case 'LIST_COMMITS_FAIL':
      return {
	...state,
	errorMessage: action.errorMessage
      }

    default:
      return state
  }
}

export default repositories
