import mongoose from "mongoose";
import { type } from "os";


const adminSchema = new mongoose.Schema({
    adminName:{
        type:String,
        requied:true,
        unique:true,
        default:"myth"
    },
    password:{
        type:String,
        requied:true,
        default:"myth1234"
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
})

const Admin = mongoose.model.Admins || mongoose.model('adminSchemas', adminSchema);

export default Admin;