// Imports
import React from 'react'

// Component
// Menu components to be plugged into the nav bar
const Menu = (props) => {
  const { children, ...others } = props

  return (
    <div {...others}>
      {children}
    </div>
  )
}

export default Menu
