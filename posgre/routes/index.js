// ./routes/index.js
import users from './user.js'
import photos from './photos.js'
 
const mountRoutes = (app) => {
  app.use('/users', users)
  app.use('/photos', photos)
  // etc..
}
 
export default mountRoutes