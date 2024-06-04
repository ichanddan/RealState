import express from 'express';
import ConnectDB from './DB/Db.js';
import dotenv from 'dotenv';
import route from './Routes/User.routes.js';
import bodyParser from 'body-parser';


dotenv.config()
const app = express();
const Port = 3000;
app.use(bodyParser.json())

ConnectDB()

app.use("/api/v1", route)

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`)
})