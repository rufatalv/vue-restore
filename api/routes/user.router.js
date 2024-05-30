import {Router} from "express";
import {verifyToken} from "../middleware/verifyUser.js";
import {checkRole} from "../middleware/checkRole.js";
import {getAllUsers, getSingleUser} from "../controllers/user.controller.js";

const router = new Router();


router.get("/", verifyToken, checkRole('admin'), getAllUsers);
router.get("/user", verifyToken, getSingleUser);

// router.get('/google-auth', loginUserGoogle)

export default router;
