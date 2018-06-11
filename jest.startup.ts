import * as jestCli from 'jest-cli'

import {Server} from './server/server'
import {environment} from './common/environment'
import {planetasRouter} from './planetas/planetas.router'
import {Planeta} from './planetas/planetas.model'

let server: Server
const beforeAllTests = () => {
  environment.db.url = process.env.DB_URL || 'mongodb://localhost:27017/planeta-api-test-db'
  environment.server.port = process.env.SERVER_PORT || 3001
  server = new Server()
  return server.bootstrap([
    planetasRouter
  ])
  .then(()=>Planeta.remove({}).exec())
}

const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
.then(()=>jestCli.run())
.then(()=>afterAllTests())
.catch(console.error)
