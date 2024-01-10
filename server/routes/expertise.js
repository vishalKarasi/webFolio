import express from "express";
import { Expertise } from "../models/expertise.js";
import { ImgParser } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAll(Expertise));
router.get("/:id", getOne(Expertise));
router.post("/", verifyToken, ImgParser.single("image"), createOne(Expertise));
router.put(
  "/:id",
  verifyToken,
  ImgParser.single("image"),
  updateOne(Expertise)
);
router.delete("/:id", verifyToken, deleteOne(Expertise));

export default router;
