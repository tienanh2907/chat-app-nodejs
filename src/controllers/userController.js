import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../token.js";

// @method  POST
// @route   /api/user/register
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, image } = req.body;
        let userExist = false;
        if (image === "") {
            //db auto create img
            image = undefined;
        }

        if (!name || !email || !password) {
            return res.status(404).json({
                errorCode: 1,
                message: "Please enter all required fields",
            });
        }

        userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                errorCode: 1,
                message: "Email already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            image: image,
        });

        if (newUser) {
            return res.status(200).json({
                errorCode: 0,
                message: "Create user sucessful",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    image: newUser.image,
                },
                token: generateToken(newUser._id),
            });
        } else {
            return res.status(500).json({
                errorCode: -1,
                message: "Create user failed",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// @method  POST
// @route   /api/user/
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                errorCode: 1,
                message: "Please enter all required fields",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorCode: 1,
                message: "Email do not exist",
            });
        }

        const  checkPass = await bcrypt.compare(password,user.password  )
        if (!checkPass) {
            return res
                .status(400)
                .json({ errorCode: 1, message: "Password invalid" });
        }

        delete user._doc.password;
        return res.status(200).json({
            user,
            errorCode: 0,
            message: "User login sucessful",
            token: generateToken(user._id),
        });
    } catch (err) {
        throw Error(err);
    }
};

// @decs     get by keyword or get all user
// @method   GET
// @route    /api/user?search=
const getUser = async (req, res, next) => {
    try {
        const keyword = req.query.search
            ? {
                  $or: [
                      { name: { $regex: req.query.search, $options: "i" } },
                      { email: { $regex: req.query.search, $options: "i" } },
                  ],
              }
            : {};
        const users = await User.find(keyword).limit(3).select("-password");
        if (!users) {
            throw Error("No users found");
        }
        res.status(200).json({ users });
    } catch (error) {
        throw Error(error);
    }
};

const updateUser = async (req, res, next) => {};

export { registerUser, loginUser, getUser, updateUser };
