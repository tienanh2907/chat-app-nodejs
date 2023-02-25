import MessageRoom from "./models/MessageRoom.js";

const socketServices = (io) => {
    io.on("connection", (socket) => {
        socket.on("client:join-room", async ({room}) => {
            socket.join(room);
            try {
                const messages = await MessageRoom.find({ room });
                socket.to(messages.room).emit("server:join-room", messages);
            } catch (err) {
                console.log(err);
            }
        });

        socket.on("client:send-message", async (data) => {
            if (!data.content) return console.log("message is empty");

            try {
                const msg = await MessageRoom.create(data);
                socket.to(msg.room).emit("server:chat-message", msg);
            } catch (err) {
                console.log(err);
            }
        });

        // socket.on("disconnect", () => {
        //     socket.to(data.room).emit("user-leave", data.username);
        // });
    });
};

export default socketServices;
