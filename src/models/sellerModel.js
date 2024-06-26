// not in use 

import mongoose from "mongoose";
import { type } from "os";


const sellerSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, "Please provide a user name"]
    }
})