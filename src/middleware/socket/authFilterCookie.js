import User from "../../model/user.model.js";
import SocketUser from "../../model/socketUser.model.js";


const authFilterCookie = async (socket, next) => {
    try {
        const session = socket.request.session;

        if (!session || !session.userId) {
            console.error('Conexión rechazada: sin sesión válida');
            next(new Error('Conexión rechazada: sin sesión válida'));
        }

        console.log('Cookies del cliente:', session);

        const user = await User.findOne({_id: session.userId})

        if (!user || !user.username) {
            console.error('Conexión rechazada: sin sesión válida');
            next(new Error('Conexión rechazada: sin sesión válida'));
        }

        socket.userId = user.username;
        const userSocket = new SocketUser({socketId: socket.id, userUsername: user.username});
        await userSocket.save()

        next()
    } catch (err) {
        next(err);
    }
}

export default authFilterCookie;
