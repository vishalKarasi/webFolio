import express from "express";
import { Experience } from "../models/experience.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ImgParser } from "../middlewares/multer.js";
import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAll(Experience));
router.get("/:id", getOne(Experience));
router.post("/", verifyToken, ImgParser.single("image"), createOne(Experience));
router.put(
  "/:id",
  verifyToken,
  ImgParser.single("image"),
  updateOne(Experience)
);
router.delete("/:id", verifyToken, deleteOne(Experience));

export default router;
