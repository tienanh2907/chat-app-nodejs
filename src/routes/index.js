import userRoutes from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";
import messageRoutes from "./messageRoutes.js";
import messageRoomRoutes from "./messageRoomRoutes.js";

const routes = (app) => {
    app.get("/", (req, res) => {
        res.render("chat");
    });

    app.get("/login", (req, res) => {
        res.render("login");

    });

    app.get("/register", (req, res) => {
        res.render("register");
    });

    app.get("/home", (req, res) => {
        res.render("home", users);
    });

    app.get("/chat", (req, res) => {
        res.render("chat", {
            username: users[0],
            room: rooms[0],
        });
    });

    //====API====
    app.use("/api/user", userRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/message", messageRoutes);
    app.use("/api/message-room", messageRoomRoutes);
};

export default routes;
