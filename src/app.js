import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

import http from "http";
import {Server} from 'socket.io'

const server = http.createServer(app);
const io = new Server(server);

import messageController from "./controller/socket/messageController.js";
import connectionController from "./controller/socket/connectionController.js";
import channelController from "./controller/socket/channelController.js";

io.on('connection', (socket) => {

    connectionController(io, socket);
    messageController(io, socket);
    channelController(io, socket);
});

server.listen(3000, () => {
    console.log('socket.io running at http://localhost:3000');
});

app.get("/", (req, res) => {
    res.send("Todo ok");
});

app.use("/user", userRoutes);


export default app;
