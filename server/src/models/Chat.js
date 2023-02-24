import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            required: true,
            maxlength: 200,
            trim: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
