import express from "express";
import ConnectDB from "./DB/Db.js";
import dotenv from "dotenv";
import route from "./Routes/User.routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import productListRoute from "./Routes/Product.routes.js";
import { contectRoute } from "./Routes/contect.routes.js";

dotenv.config();
const app = express();
const Port = 3000;
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://real-state-six-neon.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true, // Enable this if your app uses cookies or authentication
};

app.use(cors(corsOptions));

ConnectDB();

app.use("/api/v1", route);
app.use("/api/v1", productListRoute);
app.use("/api/v1", contectRoute);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
