export default function (io, socket) {
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('sendMessageToSpecificUser', (user, message) => {
        io.to(user).emit('receiveMessageToSpecificUser', {fromUser:socket.userId, message});
    });
}
