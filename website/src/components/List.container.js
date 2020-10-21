import { connect } from 'react-redux'
import { getRepositories, getCommits } from '../actions/App.action'
import List from './List'

const mapStateToProps = state => ({
  repositories: state.repositories.list,
  commits: state.repositories.commits
})

const mapDispatchToProps = (dispatch) => ({
  loadRepositories: (owner) => dispatch(getRepositories(owner)),
  loadCommits: (owner, name) => dispatch(getCommits(owner, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
