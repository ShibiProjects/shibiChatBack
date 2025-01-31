import {Server, Socket} from "socket.io";
import ChannelMessage from "../../model/channelMessage.model";
import Channel from "../../model/channel.model";

export default function (io: Server, socket: Socket) {
    socket.on('joinChannel', async (channelName: string) => {
        const ChannelSave = new Channel({channelName: channelName, userId: socket.userId});

        await ChannelSave.save().then(() => {
                console.log(`${socket.userId} se unió al canal: ${channelName}`);

                socket.join(channelName);

                socket.emit('welcomeMessage', `¡Bienvenido al canal '${channelName}'! ${socket.userId}`);

                socket.broadcast.to(channelName).emit('newUserJoined', `${socket.userId} se ha unido al canal '${channelName}'`);
            }
        );
    });

    socket.on('leaveChannel', (channelName: string) => {
        Channel.findOneAndDelete({channelName: channelName, userId: socket.userId}).then(
            () => {
                console.log(`${socket.userId} salio del canal: ${channelName}`);

                socket.leave(channelName);

                io.to(channelName).emit('channelMessage', {
                    channelName: channelName,
                    message: `${socket.userId} a salido del canal`
                });
            }
        )
    })

    socket.on('sendMessageToChannel', async (channelName: string, message: string) => {

        const channelMessageSave = new ChannelMessage({
            channelName: channelName,
            message: message,
            fromUserId: socket.userId
        });
        await channelMessageSave.save().then(() => {
            console.log(`Enviando mensaje al canal ${channelName}: ${message}`);

            io.to(channelName).emit('channelMessage', {
                channelName: channelName,
                fromUser: socket.userId,
                message: message
            });
        });
    });
}