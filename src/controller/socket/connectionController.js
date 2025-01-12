import SocketUser from "../../model/socketUser.model.js";

export default function (io, socket) {
    socket.on('disconnect', async () => {
        await SocketUser.findOneAndDelete({socketId: socket.id, userUsername: socket.userId});
        console.log(socket.id, " ---- ", socket.userId);
    });

    socket.on('connect_error', (err) => {
        console.log('connect_error', err);
    })
}