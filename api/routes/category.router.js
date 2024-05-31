import {Router} from "express";
import {createCategory, getAllCategories} from "../controllers/category.controller.js";
import {checkRole} from "../middleware/checkRole.js";
import {verifyToken} from "../middleware/verifyUser.js";


const router = new Router();


router.get('/', getAllCategories)
router.post('/add-category', verifyToken, checkRole('admin'), createCategory)


export default router;