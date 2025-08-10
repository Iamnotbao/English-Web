import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { CreateComment, GetAllComment, GetCommentById } from "../controller/comment.controller";

const router = Router();

router.post("/:post_id/:user_id", authMiddleware,CreateComment );
router.get("/:post_id", authMiddleware,GetCommentById);
router.get("/", authMiddleware,GetAllComment);

export default router;