// App Imports
import { APP_URL_API } from '../config/env'
import admin from './admin'
import home from './home'
import user from './user'
import product from './product'
import crate from './crate'

// Combined routes
// creating and exporting a new object with properties copied from each of the objects exported in the route files
export const routes = Object.assign(admin, home, user, product, crate)
console.log('ROUTES', routes)

// API Routes
// assigning the variable APP_URL_API (which has the value of http://localhost:8000 -- backend server), to the variable 'routeApi' and exporting it so the route is easily acccessible throughout app
export const routeApi = APP_URL_API

// Image
export const routeImage = APP_URL_API
