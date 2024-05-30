/* eslint-disable no-unused-vars */
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {errorHandler} from "../middleware/errorHandler.js";
import {getGoogleOAuthTokens} from "../utils/googleAuth.js";
import {OAuth2Client} from "google-auth-library";

export const registerUser = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.findOne({username});
    const newUser = new User({username, email, password: hashedPassword});
    if (user) {
        return res.status(409).json({
            message: "User Already Exists",
            status: 409,
        });
    }
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const {username, password} = req.body;
    const validUser = await User.findOne({username});
    if (!validUser)
        return res.status(404).json({
            message: "User not found",
            status: 404,
        });
    const validPass = await bcryptjs.compare(password, validUser.password);
    if (validPass) {
        const {password: pass, ...safeData} = validUser._doc;
        // eslint-disable-next-line no-undef
        const token = jwt.sign({user: safeData}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res
            .cookie("access_token", token)
            .status(200)
            .json({
                message: "Login successful",
                status: 200,
                user: {...safeData, token},
            });
    } else {
        next(errorHandler(res, 401, "Unauthorized"));
    }
};
//
// export const loginUserGoogle = async (req, res, next) => {
//     const code = req.query.code;
//     console.log(code)
//     const tokens = await getGoogleOAuthTokens(code);
//     console.log(tokens)
//     const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
//     const ticket = await client.verifyIdToken({
//         idToken: tokens.id_token,
//         audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const {email, name} = payload;
//     const user = await User.findOne({
//         email,
//     });
//     if (user) {
//         const {password: pass, ...safeData} = user._doc;
//         const token = jwt.sign({user: safeData}, process.env.JWT_SECRET, {expiresIn: '1h'});
//         res
//             .cookie("access_token", token)
//             .redirect(process.env.FRONT_END_URL);
//     } else {
//         console.log(user);
//         // Handle the case where the user is not found in your database
//         res.status(404).json({message: 'User not found'});
//     }
//     console.log(user)
//
// }