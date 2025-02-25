import express from "express";

//import controllers
import authController from "../controllers/user/authController.js";
import productController from "../controllers/user/productController.js";

const userRouter = express.Router();

userRouter.get("/", authController.index);
userRouter.get("/mattress", productController.mattress);

//exporting user route
export default userRouter;
