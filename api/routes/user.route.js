import {Router} from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/create", userController.createUserController);
router.get("/", authMiddleware, userController.findAllUserController);
router.get(
  "/findById/:id?",
  authMiddleware,
  validId,
  userController.findUserByIdController
);
router.patch(
  "/update/:id",
  validId,
  authMiddleware,
  userController.updateUserController
);

export default router;
