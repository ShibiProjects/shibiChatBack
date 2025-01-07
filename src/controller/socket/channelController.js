export default function (io, socket) {
    socket.on('joinChannel', (channelName) => {
        console.log(`${socket.userId} se unió al canal: ${channelName}`);

        socket.join(channelName);

        socket.emit('welcomeMessage', `¡Bienvenido al canal '${channelName}'! ${socket.userId}`);

        socket.broadcast.to(channelName).emit('newUserJoined', `${socket.userId} se ha unido al canal '${channelName}'`);
    });

    socket.on('leaveChannel', (channelName) => {
        console.log(`${socket.userId} salio del canal: ${channelName}`);

        socket.leave(channelName);

        io.to(channelName).emit('channelMessage', {
            channelName: channelName,
            message: `${socket.userId} a salido del canal`
        });
    })

    socket.on('sendMessageToChannel', (channelName, message) => {
        console.log(`Enviando mensaje al canal ${channelName}: ${message}`);
        io.to(channelName).emit('channelMessage', {channelName: channelName, message: message});
    });
}