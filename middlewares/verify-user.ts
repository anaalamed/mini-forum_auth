import { verifyToken } from '../utils/tokens'

export const verifyUser = async (req, res, next) => {
    try {
        const { token } = req.cookies
        req.user = verifyToken(token);
        next();
    } catch {
        res.status(401).json({ error: "user not authorized" });
    }
}




// res.cookie("token", getToken({
//     _id: userFound._id,
//     name: userFound.firstName,
//     role: userFound.role,
//     tokenCreated
// }), {maxAge: THIRTY_DAYS})