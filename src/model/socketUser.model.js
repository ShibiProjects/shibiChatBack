import mongoose from "mongoose";

const socketUserSchema = new mongoose.Schema({
    socketId: {
        type: String,
        required: true,
    },
    userUsername: {
        type: String,
        required: true,
    },
});

socketUserSchema.index({socketId: 1, userUsername: 1});

socketUserSchema.pre("save", async function (next) {
    try {

        if (!this.socketId || !this.userUsername) {
            next(new Error("SocketId y userUsername son obligatorios"));
        }
        next();
    } catch (err) {
        next(err);
    }
});

const SocketUser = mongoose.model("SocketUser", socketUserSchema);

export default SocketUser;