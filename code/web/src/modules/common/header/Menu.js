// Imports
import React from 'react'

// Component
const Menu = (props) => {
  const { children, ...others } = props
  // children are MenuItem components, others iterate over the rest. 
  // children seems to be assigned automatically, the only other prop in `Header's` menu is style
  return (
    <div {...others}>
      {children}
    </div>
  )
}

export default Menu

const props = {
  trees: 'bananas',
  monkeys: 'bats',
  children: 'toys'
}