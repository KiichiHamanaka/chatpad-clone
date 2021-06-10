import express from 'express'
import { Server,Socket } from 'socket.io';

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

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    },
})

io.on('connection', async (socket: Socket) => {
    console.log(`Hello ${socket.id}`)
    let roomsCount = 0
    let roomSockets = await io.in(`room ${roomsCount}`).fetchSockets();
    socket.on('JOIN_REQUEST', async () => {
        console.log(`room ${roomsCount}は${roomSockets.length}人います`)
        while(true){
            if(roomSockets.length < 2){
                socket.join(`room ${roomsCount}`)
                roomSockets = await io.in(`room ${roomsCount}`)
                    .fetchSockets();
                console.log(`${socket.id} join to room ${roomsCount}`)
                socket.to(socket.id).emit('MESSAGE',`room ${roomsCount}`)
                if(roomSockets.length === 2){
                    socket.to(`room ${roomsCount}`)
                        .emit("MATCH_START",
                        roomSockets.map((data)=>data.id))
                    return
                }
            return
            }else{
                roomsCount++
                roomSockets = await io.in(`room ${roomsCount}`).fetchSockets();
                console.log(`${roomSockets.length} peoples in room ${roomsCount}`)
            }
        }
    })
    socket.on('LEAVE_REQUEST', () => {
        console.log(`${socket.id} leave room ${roomsCount}`)
        roomsCount = 0
    })
    socket.on('MESSAGE', (body) => {
        socket.to(`room ${roomsCount}`).emit("MESSAGE",
            {
                body:body,
                userid:socket.id
            })
    })
    socket.on('disconnect', () => {
        socket.to(`room ${roomsCount}`).emit("MESSAGE",
            {
                userid:socket.id
            })
    })
})
