import express from "express";
import connectDatabase from "./api/database/db.js"
import dotenv from "dotenv"
import homeRouter from "./api/routes/home.route.js"
import userRouter from "./api/routes/user.route.js"
import authRouter from "./api/routes/auth.route.js"
import postRouter from "./api/routes/post.route.js"
import uploadRouter from "./api/routes/upload.route.js"
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 3700;

connectDatabase();
app.use(cors());
app.use(express.json());

app.use("/",homeRouter);
app.use("/users",userRouter);
app.use("/auth",authRouter);
app.use("/posts",postRouter);
app.use("/upload",uploadRouter);


app.listen(port,()=>console.log(`[Server Online]: PORT:${port}`));