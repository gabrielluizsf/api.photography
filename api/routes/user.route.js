import  {  Router } from "express";
import globalMiddleware from "../middlewares/global.middlewares.js";
import {authMiddleware} from "../middlewares/auth.middlewares.js";
import userController from "../controllers/user.controller.js";

const router = Router();


router.post("/",userController.create);
router.get("/",authMiddleware,userController.findAllUsers);
router.get("/:id",authMiddleware,globalMiddleware.isValidId,globalMiddleware.isValidUser,userController.findById);
router.patch("/update/:id",authMiddleware,globalMiddleware.isValidId,globalMiddleware.isValidUser,userController.updateUserById);


export default router;