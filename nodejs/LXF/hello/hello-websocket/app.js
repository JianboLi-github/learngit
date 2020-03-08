const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({
    port: 3000
})

wss.on('connection', function(ws) {
    console.log(`[SERVER] Connection() `)
    ws.on('message', function(message) {
        console.log(`[SERVER] Received: ${message}`)
        ws.send(`[CLIENT] say: ${message}`, (err) => {
            if(err) {
                console.log(`[SERVER] error: ${err}`)
            }
        })
    })
})


let ws = new WebSocket('ws://localhost:3000/test')
ws.on('open', function() {
    console.log(`[CLIENT] open()`)
    ws.send('hello, i`m client')
})
.on('message', function(message) {
    console.log(`[CLIENT] Recived: ${message}`)
})