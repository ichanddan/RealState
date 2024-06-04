import express from "express";
import { signup } from "../Controller/User.controller.js";

const route = express.Router();

route.post("/signup", signup)




export default route;