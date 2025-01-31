import SocketUser from "../../model/socketUser.model.js";
import {Server, Socket} from "socket.io";

export default function (io: Server, socket: Socket) {
    socket.on('disconnect', async () => {
        await SocketUser.findOneAndDelete({socketId: socket.id, userUsername: socket.userId});
        console.log(socket.id, " ---- ", socket.userId);
    });

    socket.on('connect_error', (err: any) => {
        console.log('connect_error', err);
    })
}