// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import Layout from '../../modules/common/Layout'
import NotFound from '../../modules/common/NotFound'
import RoutePrivate from '../../modules/auth/RoutePrivate'

// checking to see what the mapped routes look like. CAN DELETE CONSOLE LOG LATER!
console.log(Object.values(routes).map(route => console.log('route:', route, 'route path:', route.path)))

const App = () => (
  <Layout>
    <Switch>
      {/* maps over each object exported from files in the routes */}
      {Object.values(routes).map((route, index) => (
        route.auth 
        // if the route has a property called auth with truthy value then return this code...
          ? <RoutePrivate {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
          : 
          // OTHERWISE return this code...
          // DOES STYLESFORM NEED AUTH PROPERTY??????
          <Route {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
      ))}

      <Route component={NotFound}/>
    </Switch>
  </Layout>
)

export default App
