import express from "express";

//import controllers
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", userController.index);

//exporting user route
export default userRouter;
