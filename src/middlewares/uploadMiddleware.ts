import multer from "multer";
import { Request } from "express";
import { FileFilterCallback } from "multer";
import { MulterFile } from "../commons/types";

const storage = multer.memoryStorage()

function fileFilter(req: Request, file: MulterFile, cb: FileFilterCallback) {
  const mimeTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter,  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export default upload;
