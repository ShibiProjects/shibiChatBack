import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const messagesSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    userId: {
        type: ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
    },
});

const Message = mongoose.model("Message", messagesSchema);

export default Message;
