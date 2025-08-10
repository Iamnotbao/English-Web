import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { CreatePost, DeletePost, GetAllPosts, GetPostById, ToogleLike } from "../controller/post.controller";

const router = Router();

router.post("/", authMiddleware, CreatePost);
router.get("/", authMiddleware,GetAllPosts);
router.get("/:id", authMiddleware,GetPostById);
router.post("/:id/like/:user_id", authMiddleware, ToogleLike);
router.delete("/:id/:user_id", authMiddleware, DeletePost);

export default router;
