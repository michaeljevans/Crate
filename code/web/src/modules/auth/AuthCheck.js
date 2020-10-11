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
  // checks if user is authenticated to determine how to redirect the user
  // admins will be redirected to an admin dashboard
  // users will be redirected to the Crates pages through the path value of 'crate.list.path'
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
