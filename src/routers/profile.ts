import { Router } from "express";
import { createNewProfile, getDetailProfile, getProfile, updateProfile } from "../handlers/profile";
import { singleCloudUploader } from "../middleware/upload";

const profileRouter = Router();

profileRouter.post("/:username" ,singleCloudUploader("profile"), createNewProfile);

profileRouter.get("/" , getProfile);

profileRouter.patch("/:id" , updateProfile);

profileRouter.get("/:id" , getDetailProfile);

export default profileRouter