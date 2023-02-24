// import userRoutes from "./userRoutes.js";
// import chatRoutes from "./chatRoutes.js";
// import messageRoutes from "./messageRoutes.js";
import messageRoomRoutes from "./messageRoomRoutes.js";

const routes = (app) => {
    app.get("/", (req, res) => {
        res.render("chat");
    });

    //====API====S
    // app.use("/api/user", userRoutes);
    // app.use("/api/chat", chatRoutes);
    // app.use("/api/message", messageRoutes);
    app.use("/api/message-room", messageRoomRoutes);
};

export default routes;
