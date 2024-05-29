import {Router} from "express";
import {
    addProduct, addProductToLikes,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
} from "../controllers/product.controller.js";
import validateObjectId from "../middleware/objectId.js";
import {verifyToken} from "../middleware/verifyUser.js";
import {checkRole} from "../middleware/checkRole.js";
import upload from "../utils/multerConfig.js";

const router = new Router();

router.get("/", getAllProducts);
router.get("/:id", validateObjectId, getSingleProduct);
router.post('/add-product', verifyToken,
    upload.single('image'), checkRole('admin'), addProduct);
router.post("/add-to-fav", verifyToken, addProductToLikes);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
