import express from 'express';
import ConnectDB from './DB/Db.js';
import dotenv from 'dotenv';


dotenv.config()
const app = express();
const Port = 3000;

ConnectDB()

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`)
})