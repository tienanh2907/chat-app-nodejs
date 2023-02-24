import MessageRoom from "../models/MessageRoom.js";

//@method   POST
//route     /api/message-room/
const sendMessage = async (req, res, next) => {
    const { userName, content, roomName } = req.body;
    if (!content || !roomName) {
        res.status(404).json({ errorMessage: "Content is empty" });
    }

    const newMessage = {
        user: userName,
        content: content,
        room: roomName,
    };

    try {
        const message = await MessageRoom.create(newMessage);
        res.json(message);
        // res.render("chat", message);
    } catch (error) {
        throw Error(error);
    }
};

//@method   GET
//@route    /api/message-room/:roomNames
const fetchMessage = async (req, res, next) => {
    const { roomName } = req.params;
    try {
        const message = await MessageRoom.find({ room: roomName });
        res.json(message);
        // res.render("chat", message);
    } catch (error) {
        throw Error(error);
    }
};

export { sendMessage, fetchMessage };
