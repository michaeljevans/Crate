// Imports
import { Server } from 'http'
import Express from 'express'

// App Imports
import loadModules from './setup/server/load-modules'
import loadRoutes from './setup/server/load-routes'
import startServer from './setup/server/start-server'

// Create new server
const app = new Express()
const server = new Server(app)
// App component lives in ./setup/client
// but this is not the same app 
// there's something about SEO and server-side rendering
// where a web browser cannot access the content of a "single-page-web-app"
// and this is the solution to that problem. 

// Load modules
loadModules(app)

// Load routes
loadRoutes(app)

// Start Server
startServer(server)
