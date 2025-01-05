import express from "express";
import userRoutes from "./routes/user.routes.js";
import cookieSession from "cookie-session";
import {COOKIE_KEY, CORS_ORIGIN} from "./config/config.js";

const app = express();

app.use(express.json());

const sessionMiddleware = cookieSession({
    resave: true,
    name: 'session',
    keys: [COOKIE_KEY],
    domain: 'localhost',

    cookie: {maxAge: 24 * 60 * 60 * 1000},
})

app.use(sessionMiddleware);

app.get("/", (req, res) => {
    res.send("Todo ok");
});

app.use("/user", userRoutes);

//Socket IO
import http from "http";
import {Server} from 'socket.io'
import connectionController from "./controller/socket/connectionController.js";
import messageController from "./controller/socket/messageController.js";
import channelController from "./controller/socket/channelController.js";
import authFilterCookie from "./middleware/socket/authFilterCookie.js";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
        credentials: true,
    },
});

io.engine.use(sessionMiddleware);
io.use(authFilterCookie);

io.on('connection', async (socket) => {
    socket.join(socket.userId);

    connectionController(io, socket);
    messageController(io, socket);
    channelController(io, socket);
});

export {app, server};
