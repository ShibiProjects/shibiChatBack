import mongoose, {Document, Model, Schema} from "mongoose";


export interface IChannelMessage extends Document {
    channelName: string;
    content: string;
    fromUserId: string;
}

type ChannelMessageModel = Model<IChannelMessage>;

const channelMessageSchema = new Schema<IChannelMessage, ChannelMessageModel>(
    {
        channelName: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        fromUserId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const ChannelMessage = mongoose.model<IChannelMessage, ChannelMessageModel>("ChannelMessage", channelMessageSchema);

export default ChannelMessage;
