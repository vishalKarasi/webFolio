import express from "express";
import { Message } from "../models/message.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getAll, createOne, deleteOne } from "../controllers/admin.js";
import { ImgParser } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAll(Message));
router.post("/", ImgParser.none(), createOne(Message));
router.delete("/:id", verifyToken, deleteOne(Message));

export default router;
