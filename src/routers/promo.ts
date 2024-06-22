import { Router } from "express";
import { createNewPromo , getPromo, updatePromo } from "../handlers/promo";
import { singleCloudUploader } from "../middleware/upload";

const promoRouter = Router();

promoRouter.get("/" , getPromo);

promoRouter.post("/", singleCloudUploader("promoimg"), createNewPromo);

promoRouter.patch("/:id", singleCloudUploader("promoimg") , updatePromo);

//promoRouter.delete("/:id", deletePromo);

export default promoRouter;