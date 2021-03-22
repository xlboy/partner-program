import { Server } from 'http'
import { print } from 'configs/utils'
import Environment from 'configs/environments'
import createKoaServer from 'configs/application'
import * as bootstrap from 'configs/bootstrap'
import WebSocket from 'ws'
import WebSocketApi from 'app/socket'
module.exports = (async (): Promise<Server> => {
  try {
    const app = await createKoaServer()
    const server = app.listen(Environment.port, () => {
      print.log(
        `server listening on http://127.0.0.1:${Environment.port}/, in ${Environment.identity} mode, the starting time is ${new Date().toLocaleString()}`,
      )
      bootstrap.after()
    })
    const wss = new WebSocket.Server({
      server
    })
    WebSocketApi(wss)
    return server
  } catch (e) {
    console.log(e)
  }
})()
