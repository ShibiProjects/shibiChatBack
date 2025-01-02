export default function (io, socket) {
    socket.on('sendMessage', (message) => {
        console.log(`Mensaje recibido: ${message}`);

        io.emit('receiveMessage', message);
    });
}
