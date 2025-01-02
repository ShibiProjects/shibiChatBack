export default function (io, socket) {
    socket.on('joinChannel', (channelName) => {
        console.log(`${socket.id} se unió al canal: ${channelName}`);

        socket.join(channelName);

        socket.emit('welcomeMessage', `¡Bienvenido al canal '${channelName}'! Tu socket.id es ${socket.id}`);

        socket.broadcast.to(channelName).emit('newUserJoined', `${socket.id} se ha unido al canal '${channelName}'`);
    });

    socket.on('sendMessageToChannel', (channelName, message) => {
        console.log(`Enviando mensaje al canal ${channelName}: ${message}`);
        io.to(channelName).emit('channelMessage',
            {channelName: channelName, message: message});
    });
}