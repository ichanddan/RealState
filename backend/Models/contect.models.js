import mongoose from "mongoose";

const contectDillerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    sellOrRent:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Contectdeller = mongoose.model("contect", contectDillerSchema)