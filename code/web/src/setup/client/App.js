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
    <Switch>
      {/* maps over each object exported from files in the routes directory*/}
      { 
      Object.values(routes).map((route, index) => (
        route.auth 
        // if the route has a property called auth with truthy value then render RoutePrivate for that route
        // I think that the styleSurvey route will need to be RoutePrivate as we only want users to see it if they've signed up to app, AND are logged in
          ? <RoutePrivate {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
          : 
          // OTHERWISE.. render Route 
          <Route {...route} key={index} path={typeof route.path === 'function' ? route.path() : route.path}/>
      ))}
      
      <Route component={NotFound}/>
    </Switch>
  </Layout>
)

export default App
