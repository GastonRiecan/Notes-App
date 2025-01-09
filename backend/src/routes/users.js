import express from "express";
import { userCtrl } from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.route('/')
  .get(userCtrl.getUsers)
  .post(userCtrl.createUser)


userRouter.route('/:id')
  //.get(userCtrl.getUser)
  //.put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser)

export default userRouter