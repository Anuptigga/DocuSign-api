import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "docusign",
      resource_type: "auto",
      allowed_formats: ["jpeg", "jpg", "png", "pdf"],
      transformation:
        file.mimetype === "application/pdf"
          ? []
          : [{ quality: "auto" }, { fetch_format: "auto" }],
    };
  },
});
const upload = multer({ storage });
export default upload;
