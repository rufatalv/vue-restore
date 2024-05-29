import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";
import validateObjectId from "../middleware/objectId.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = new Router();

router.get("/", getAllProducts);
router.get("/:id", validateObjectId, getSingleProduct);
router.post("/add-product", verifyToken, addProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
