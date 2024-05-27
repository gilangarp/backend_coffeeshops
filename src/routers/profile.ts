import { Router } from "express";
import { createNewProfile, getProfile, updateProfile } from "../handlers/profile";

const profileRouter = Router();

profileRouter.post("/" , createNewProfile);
profileRouter.get("/" , getProfile);
profileRouter.patch("/:id" , updateProfile)
export default profileRouter