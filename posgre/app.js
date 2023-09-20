// ./app.js
import express from 'express'
import mountRoutes from './routes.js'
 
const app = express()
mountRoutes(app)
 
// ... more express setup stuff can follow