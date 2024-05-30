import User from "../models/user.model.js";
import extractAndVerifyToken from "../utils/extractAndVerifyToken.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('likedProducts');

        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(404).json({
                message: "No Users Available",
                status: 404,
            });
        }
    } catch (error) {
        next(error);
    }
}

export const getSingleUser = async (req, res, next) => {
    try {
        const decodedToken = extractAndVerifyToken(req.headers);
        const email = decodedToken.user.email;
        const user = await User.findOne({email}).populate('likedProducts');

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({
                message: "User Not Found",
                status: 404,
            });
        }
    } catch (error) {
        next(error);
    }
}