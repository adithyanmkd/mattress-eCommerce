import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js"; //imported db
import expressLayouts from "express-ejs-layouts";

//importing routes
import userRouter from "./routes/userRouter.js";

const app = express();

//fix __dirname && __filename for module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connet DB
connectDB();

// Use express-ejs-layouts
app.use(expressLayouts);

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/user-layout");

//serve static files (images, js, CSS)
app.use(express.static(path.join(__dirname, "public")));

//router
app.use("/", userRouter);

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
