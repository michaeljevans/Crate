// Imports
import { Server } from 'http'
import Express from 'express'

// App Imports
import loadModules from './setup/server/load-modules'
import loadRoutes from './setup/server/load-routes'
import startServer from './setup/server/start-server'

// NOTE: rendered on window load and renders the <App /> component (and connects App to Redux)
// Create new server
const app = new Express()
const server = new Server(app)

// Load modules
loadModules(app)

// Load routes
loadRoutes(app)

// Start Server
startServer(server)
