import {Router} from "express";
import multer from "multer";
import multerConfig from "../config/multer.config.js";
import {createUploader,uploader,findALL, finder, imageDeleter} from "../controllers/upload.controller.js"
const router = Router();

router.post("/file", createUploader ,multer(multerConfig).single('file'),uploader);
router.get("/all",findALL);
router.get("/file/:id",finder);
router.delete("/file/:id",imageDeleter);

export default router;