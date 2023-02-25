import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
