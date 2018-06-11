import {Server} from './server/server'
import {planetasRouter} from './planetas/planetas.router'
import {mainRouter} from './main.router'

const server = new Server()
server.bootstrap([
  planetasRouter,
  mainRouter
]).then(server=>{
  console.log('Server is listening on:', server.application.address())
}).catch(error=>{
  console.log('Server failed to start')
  console.error(error)
  process.exit(1)
})
