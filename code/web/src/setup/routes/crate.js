// App Imports
import List from '../../modules/crate/List'

// Crate routes
// path for the Crates page which renders a List component(?)
export default {
  list: {
    path: '/crates',
    component: List,
    auth: true
  }
}
