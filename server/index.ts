import express from 'express'
import io, { Socket } from 'socket.io';

const app: express.Express = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(3001,()=>{ console.log('Example app listening on port 3001!') })

const ws = new io.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    },
})

ws.on('connection', (socket: Socket) => {
    console.log('hello world!')
})
