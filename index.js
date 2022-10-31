import connectDatabase from  "./api/data/conect.js";
import userRoute from  "./api/routes/user.route.js";
import authRoute from  "./api/routes/auth.route.js";
import postRoute from  "./api/routes/post.route.js";
import express from  "express";
import cors from  "cors";
import dotenv from "dotenv";

dotenv.config();

const website = process.env.WEBSITE_URL;
const port = process.env.PORT || 3700;
const app = express();

connectDatabase();
app.use(cors(website));
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);


app.listen(port, () => console.log(`Server running on port: ${port}`));
