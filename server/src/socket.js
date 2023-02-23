const socketServices = (io) => {
    const data = {};
    io.on("connection", (socket) => {
        socket.on("user-connect", (username, room) => {
            socket.join(room);
            data.username = username;
            data.room = room;
            socket.to(room).emit("user-joined", username, data);
        });

        socket.on("sent-message", (data) => {
            socket.to(data.room).emit("chat-message", data);
        });

        socket.on("disconnect", () => {
            socket.to(data.room).emit("user-leave", data.username);
        });
    });
};

export default socketServices;
