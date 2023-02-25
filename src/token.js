import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    const newToken = jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    return newToken;
};

export default generateToken;
