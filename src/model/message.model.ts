import mongoose, {Document, Model, Schema} from "mongoose";


export interface IMessage extends Document {
    content: string;
    fromUserId: string;
    toUserId: string;
}

type MessageModel = Model<IMessage>;

const messageSchema = new Schema<IMessage, MessageModel>(
    {
        content: {
            type: String,
            required: true,
        },
        fromUserId: {
            type: String,
            required: true,
        },
        toUserId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model<IMessage, MessageModel>("Message", messageSchema);

export default Message;
