import express from "express";
import userRoutes from "./routes/user.routes.js";
import cookieSession from "cookie-session";
import {COOKIE_KEY, CORS_ORIGIN,SERVER_DOMAIN} from "./config/config.js";
import cors from "cors";
import fs from "fs";

const app = express();

const optionsSSL = {
    key: fs.readFileSync('nginx.key'),
    cert: fs.readFileSync('nginx.crt'),
};

app.use(express.json());

const sessionMiddleware = cookieSession({
    resave: true,
    name: 'session',
    keys: [COOKIE_KEY],
    domain: SERVER_DOMAIN,
    sameSite: 'None',
    secure: true,
    partitioned: true,

    cookie: {maxAge: 24 * 60 * 60 * 1000},
})

app.use(
    cors({
        origin: [CORS_ORIGIN],
        credentials: true,
    })
);

app.use(sessionMiddleware);

app.get("/", (req, res) => {
    res.send("Todo ok");
});

app.use("/user", userRoutes);

//Socket IO
import https from "https";
import {Server} from 'socket.io'
import connectionController from "./controller/socket/connectionController.js";
import messageController from "./controller/socket/messageController.js";
import channelController from "./controller/socket/channelController.js";
import authFilterCookie from "./middleware/socket/authFilterCookie.js";



const server = https.createServer(optionsSSL,app);
const io = new Server(server, {
    path: '/socket',
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

const appServer = https.createServer(optionsSSL, app);

export {appServer, server};
