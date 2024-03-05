import multer from "multer";

export const ImgParser = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowMimeType = ["image/jpeg", "image/png"];
    cb(null, allowMimeType.includes(file.mimetype));
  },
});
