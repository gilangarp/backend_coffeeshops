import { Router } from "express";
import { deleteUser, getUsers, loginUser, registerNewUser, updateUsers } from "../handlers/users";

const usersRouter = Router();

usersRouter.get("/" , getUsers);

usersRouter.patch("/:id", updateUsers);

usersRouter.delete("/:id", deleteUser);

usersRouter.post("/new", registerNewUser);

usersRouter.post("/account", loginUser);

export default usersRouter;