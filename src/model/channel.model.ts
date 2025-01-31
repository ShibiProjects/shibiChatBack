import mongoose, {Model} from "mongoose";

export interface IChannel extends Document {
    channelName: string;
    userId: string;
}

type ChannelModel = Model<IChannel>;

const channelsSchema = new mongoose.Schema<IChannel, ChannelModel>({
    channelName: {
        type: String,
        required: true,
        index: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
});

const Channel = mongoose.model<IChannel, ChannelModel>("Channel", channelsSchema);

export default Channel;
