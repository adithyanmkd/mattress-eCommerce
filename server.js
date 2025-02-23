import express from "express";
import path from "path";
import { fileURLToPath } from "url";

//importing routes
import userRouter from "./routes/userRouter.js";

const app = express();

//fix __dirname && __filename for module
const __dirname = fileURLToPath(import.meta.url);
const __filename = path.join(__dirname);

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//serve static files (images, js, CSS)
app.use(express.static(path.join(__dirname, "public")));

//router
app.use("/", userRouter);
// app.use("/admin", adminRouter)

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
