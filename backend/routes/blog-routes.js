import express from "express";
import { addBlog, deleteBlog, getAllBlog, getById, getByUserId, updateBlog } from "../controllers/blog-controller";

const blogrouter = express.Router();

blogrouter.get("/", getAllBlog);
blogrouter.post("/add", addBlog);
blogrouter.put("/update/:id", updateBlog);
blogrouter.get("/:id", getById);
blogrouter.delete("/:id", deleteBlog);
blogrouter.get("/user/:id", getByUserId);
export default blogrouter;
