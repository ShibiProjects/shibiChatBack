import {ExtendedError, Socket} from 'socket.io';
import User, {IUser} from "../../model/user.model";
import SocketUser from "../../model/socketUser.model";

const authFilterCookie = async (socket: Socket, next: (err?: ExtendedError) => void): Promise<void> => {
    try {
        const session = socket.request.session;

        if (!session || !session.userId) {
            console.error('Conexión rechazada: sin sesión válida');
            return next(new Error('Conexión rechazada: sin sesión válida'));
        }

        console.log('Cookies del cliente:', session);

        const user = await User.findOne({_id: session.userId}) as IUser | null;

        if (!user || !user.userName) {
            console.error('Conexión rechazada: sin sesión válida');
            return next(new Error('Conexión rechazada: sin sesión válida'));
        }

        socket.userId = user.userName;
        const userSocket = new SocketUser({socketId: socket.id, userUsername: user.userName});
        await userSocket.save();

        next();
    } catch (err) {
        next(err as Error);
    }
};

export default authFilterCookie;
