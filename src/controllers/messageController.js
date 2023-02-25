import Message from "../models/Message.js";

//@method   POST
//route     /api/message/
const sendMessage = async (req, res, next) => {
    const { userId, content, chatId } = req.body;
    if (!content || !chatId) {
        res.status(404).json({ errorMessage: "Comment is empty" });
    }

    const newMessage = {
        sender: userId,
        content: content,
        chatId: chatId,
    };

    try {
        const message = await Message.create(newMessage);
    } catch (error) {
        throw Error(error);
    }
};

//@method   GET
//@route    /api/message/:chatId
const fetchMessage = async (req, res, next) => {
    const { chatId } = req.body;
    try {
        const message = await Message.find({ chatId }).limit(10);
    } catch (error) {
        throw Error(error);
    }
};

export { sendMessage, fetchMessage };
