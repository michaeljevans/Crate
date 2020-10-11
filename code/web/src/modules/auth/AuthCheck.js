// Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import crate from '../../setup/routes/crate'
import admin from '../../setup/routes/admin'

// Component
const AuthCheck = (props) => (
  // first checks if user is authenticated to determine whether any redirection should be executed 
  // if user is authenticated:
  // admins will be redirected to an admin dashboard
  // general users (customers) will be redirected to the Crates pages through the path value of 'crate.list.path'
  props.user.isAuthenticated ? (props.user.details.role === 'ADMIN' ? <Redirect to={admin.dashboard.path}/> : <Redirect to={crate.list.path}/>) : ''
)

// Component Properties
AuthCheck.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
// accessing the user data in the store to check the isAuthenticated property
function authCheckState(state) {
  return {
    user: state.user
  }
}

export default connect(authCheckState, {})(AuthCheck)
