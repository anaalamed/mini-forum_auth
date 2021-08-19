import User from '../models/user';
import { signToken } from '../utils/tokens';

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound: any = await User.findOne({ email, password }) as any;
        const tokenCreated = Date.now();
        const token = signToken({
            _id: userFound._id,
            name: userFound.firstName,
            role: userFound.role,
            tokenCreated
        });
        res.cookie("token", token, { maxAge: THIRTY_DAYS })
        res.json({
            // _id: userFound._id,
            // name: userFound.firstName,
            // role: userFound.role
            userFound
        });
    } catch {
        res.status(500).json({ message: "Could not login" })
    }
}
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, country, about } = req.body;
        const newUser = await User.create({ email, password, firstName, lastName, country, about });
        res.json(newUser);
    } catch {
        res.status(500).json({ message: "Could not register" })
    }
}
export const getMe = (req, res) => {
    try {
        const me = req.user;
        res.json(me);
    } catch {
        res.status(500).json({ message: "Could not get user" });
    }
}

export const updatePersonalInfo = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const updatedUser = await User.updateMany({ firstName, lastName }); // need to add if name / last name
        res.json(updatedUser);
    } catch {
        res.status(500).json({ message: "Could not update user" });
    }
}
export const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const updatedPassword = await User.updateOne({ password });
        res.json(updatedPassword);
    } catch {
        res.status(500).json({ message: "Could not update password" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: Date.now() });
        res.json({ message: "log out successfully" });
    } catch {
        res.status(500).json({ message: "Could not logout" });
    }
}