import User from "../model/User";
import bcrypt from "bcryptjs";
// http request are always a async task
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "no Users found" });
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User Alreay Exists! login Insted" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        // this is for creating hashed password
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save();

    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
};


//for encryption of password we use bcrypt js it allows u to create hashed password within mango db
//when we perform operation on database then always use try catch block and await property because

// login post code

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(404)
            .json({ message: "Couldn't Find User By this Email" });

    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }
    return res.status(200).json({ message: "Login Successfull", user: existingUser });
};