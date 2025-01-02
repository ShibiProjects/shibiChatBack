export default function (io, socket) {
    socket.on('connect', () => {
        console.log('Un usuario se ha conectado:', socket.id);

        socket.emit('welcome', '¡Bienvenido al chat!');
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado:', socket.id);
    });

    socket.on('connect_error', (err) => {
        console.log('connect_error', err);
    })
}