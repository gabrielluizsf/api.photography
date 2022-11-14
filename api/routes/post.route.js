import { Router } from "express";

import { 
    create, findAll, topPost, 
    findById, searchByTitle , ByUser,
    update,deleter,updateLikes,addingComments,
    deleteComment
} from "../controllers/post.controller.js";

import {authMiddleware} from "../middlewares/auth.middlewares.js";
import {isValidPost} from "../middlewares/global.middlewares.js";
const router = Router();


router.post("/",authMiddleware, create);
router.get("/",findAll);
router.get("/news",topPost);
router.get("/search",searchByTitle);
router.get("/ByUser",authMiddleware,ByUser);
router.get("/:id",authMiddleware,findById);
router.patch("/:id",authMiddleware,isValidPost,update);
router.delete("/:id",authMiddleware,deleter);
router.patch("/like/:id",authMiddleware,updateLikes); 
router.patch("/comments/:id",authMiddleware,addingComments);
router.patch("/comments/:idPost/delete/:idComment",authMiddleware,deleteComment);


export default router;
