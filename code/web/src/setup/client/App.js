// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import Layout from '../../modules/common/Layout'
import NotFound from '../../modules/common/NotFound'
import RoutePrivate from '../../modules/auth/RoutePrivate'

const App = () => (
  <Layout>
    {/* contains the components and routes 
        renders the Header
        receives "children" from props and renders them  
        responsible for rendering messages
        icon also receives and renders children... would Icon's children just be the text within the tag? Is this render necessary? It does add additional styling at that point
        */}
    <Switch>
      {Object.values(routes).map((route, index) => (
        //mapping over all routes
        route.auth // checks if the user is logged in?
          ? <RoutePrivate {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
          // Route paths may or may not be a function
          : <Route {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
      ))}

      <Route component={NotFound}/>
    </Switch>
  </Layout>
)

export default App
