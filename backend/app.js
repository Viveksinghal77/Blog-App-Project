import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogrouter);
mongoose
    .connect('mongodb+srv://viveksinghal887:ijHeWbbRF76ZNxwK@cluster0.mbzpv.mongodb.net/Blog?retryWrites=true&w=majority'
    )
    .then(() => app.listen(5000))
    .then(() => console.log("connected successfully and listing to host"))
    .catch((err) => console.log(err));



