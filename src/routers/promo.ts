import { Router } from "express";
import { createNewPromo , getPromo, updatePromo } from "../handlers/promo";

const promoRouter = Router();

promoRouter.get("/" , getPromo);

promoRouter.post("/", createNewPromo);

promoRouter.patch("/:id", updatePromo);

//promoRouter.delete("/:id", deletePromo);

export default promoRouter;