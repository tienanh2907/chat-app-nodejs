import Chat from "../models/Chat.js";
import User from "../models/User.js";

const accessChat = async (req, res, next) => {
    const { userId, senderId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: senderId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [senderId, userId],
        };

        try {
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({
                _id: createChat._id,
            }).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    }
};
const fetchChats = async (req, res, next) => {};
const createGroup = async (req, res, next) => {};
const renameGroup = async (req, res, next) => {};
const addToGroup = async (req, res, next) => {};
const removeFromGroup = async (req, res, next) => {};

export {
    accessChat,
    fetchChats,
    createGroup,
    renameGroup,
    addToGroup,
    removeFromGroup,
};
