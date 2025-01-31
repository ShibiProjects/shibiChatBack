import mongoose, {Document, Model, Schema} from "mongoose";

interface ISocketUser extends Document {
    socketId: string;
    userUsername: string;
}

const socketUserSchema = new Schema<ISocketUser>(
    {
        socketId: {
            type: String,
            required: true,
        },
        userUsername: {
            type: String,
            required: true,
        },
    },
);

socketUserSchema.index({socketId: 1, userUsername: 1});

socketUserSchema.pre<ISocketUser>("save", async function (next: any) {
    try {
        if (!this.socketId || !this.userUsername) {
            return next(new Error("SocketId y userUsername son obligatorios"));
        }
        next();
    } catch (err) {
        next(err as Error);
    }
});

const SocketUser: Model<ISocketUser> = mongoose.model<ISocketUser>("SocketUser", socketUserSchema);

export default SocketUser;