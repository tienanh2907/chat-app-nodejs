import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Connect to DB failed");
        console.log(error);
    }
};

export default connect;
