import express from "express";
import { Server, Socket } from "socket.io";
import eventHandle from "./eventHandler";

const app: express.Express = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket: Socket) => {
  let activeUsers = await io.fetchSockets();
  const handler = new eventHandle(io, socket);
  socket.emit("ACTIVE_USERS", activeUsers.length);
  socket.on("JOIN_REQUEST", async () => {
    await handler.joinRequest();
  });
  socket.on("LEAVE_REQUEST", async () => {
    await handler.leaveRequest();
  });
  socket.on("MESSAGE", async (data) => {
    await handler.sendMessage(data);
  });
  socket.on("disconnect", async () => {
    await handler.disconnect();
  });
});
