import { Router } from "express";
import { deleteUser, getDetailUser, getUsers, loginUser, registerNewUser, updateUsers } from "../handlers/users";
import { authorization } from "../middleware/authorization";

const usersRouter = Router();

usersRouter.get("/" , getUsers);

usersRouter.get("/:username" , authorization() , getDetailUser);

usersRouter.patch("/:id", updateUsers);

usersRouter.delete("/:id", deleteUser);

usersRouter.post("/new", registerNewUser);

usersRouter.post("/account", loginUser);

export default usersRouter;