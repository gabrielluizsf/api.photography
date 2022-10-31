import {Router} from "express";
import postController from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/create", authMiddleware, postController.createPostController);
router.get("/", postController.findAllPostsController);
router.get("/top", postController.topNewsController);
router.get("/search", postController.searchPostController);
router.get(
  "/byIdPost/:id",
  validId,
  authMiddleware,
  postController.findPostByIdController
);
router.get(
  "/byUserId",
  authMiddleware,
  validId,
  postController.findPostsByUserIdController
);
router.patch(
  "/update/:id",
  validId,
  authMiddleware,
  postController.updatePostController
);
router.delete(
  "/delete/:id",
  validId,
  authMiddleware,
  postController.deletePostController
);
router.patch(
  "/:id/like",
  validId,
  authMiddleware,
  postController.likePostController
);
router.patch(
  "/:id/comment",
  validId,
  authMiddleware,
  postController.commentPostController
);

router.patch(
  "/:id/:idComment/comment",
  validId,
  authMiddleware,
  postController.commentDeletePostController
);

export default  router;
