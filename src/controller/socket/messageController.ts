import {Server, Socket} from "socket.io";
import Message from "../../model/message.model";

export default function (io: Server, socket: Socket) {
    socket.on('sendMessage', (message: string) => {
        io.emit('receiveMessage', message);
    });

    socket.on('sendMessageToSpecificUser', async (user: string, message: string) => {
        if (user != socket.userId) {
            const messageSave = new Message({content: message, fromUserId: socket.userId, toUserId: user});
            await messageSave.save();

            io.to(user).emit('receiveMessageToSpecificUser', {fromUser: socket.userId, message});
        }
    });
}
