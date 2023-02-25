import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI ||
                "mongodb+srv://dbUser:EAv15Fn2aRS6R0jO@atlascluster.pk3leo7.mongodb.net/test"
        );
    } catch (error) {
        console.log("Connect to DB failed");
        console.log(error);
    }
};

export default connect;
