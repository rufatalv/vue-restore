import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = new Router();

router.get("/", (req, res) => {
  res.send("Hello Auth");
});

router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);
export default router;
