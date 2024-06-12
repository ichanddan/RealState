import express from "express";
import { Login, deleteUser, logOut, signup, updateUser } from "../Controller/User.controller.js";
import { veryfiyToken } from "../Middleware/jwt.auth.js";

const route = express.Router();

route.post("/signup", signup)
route.post("/login", Login)
route.post("/update/:id", veryfiyToken, updateUser)
route.delete("/delete/:id", deleteUser)
route.get("/logout", logOut)




export default route;