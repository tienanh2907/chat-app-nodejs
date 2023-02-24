import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            trim: true,
            require: true,
        },
        room: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const MessageRoom = mongoose.model("MessageRoom", messageSchema);
export default MessageRoom;
