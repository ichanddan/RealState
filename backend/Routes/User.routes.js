import express from "express";
import { Login, signup } from "../Controller/User.controller.js";

const route = express.Router();

route.post("/signup", signup)
route.post("/login", Login)




export default route;