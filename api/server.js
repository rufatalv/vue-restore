import express, {json} from "express";
import cors from "cors";
import productsRouter from "./routes/product.router.js";
import authRouter from "./routes/auth.router.js";
import connectAndRun from "./utils/connect.js";
import userRouter from "./routes/user.router.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/auth", authRouter);



connectAndRun(app, 3002);
