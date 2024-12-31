import mongoose from "mongoose";

const channelsSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: ObjectId,
    required: true,
  },
  users: {
    type: Array,
    required: true,
  },
});

const Channel = mongoose.model("Channel", channelsSchema);

export default Channel;
