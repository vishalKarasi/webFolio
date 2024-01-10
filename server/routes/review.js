import express from "express";
import { Review } from "../models/review.js";
import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/admin.js";
import { ImgParser } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAll(Review));
router.get("/:id", getOne(Review));
router.post("/", ImgParser.single("image"), createOne(Review));
router.put("/:id", ImgParser.single("image"), updateOne(Review));
router.delete("/:id", verifyToken, deleteOne(Review));

export default router;
