import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: true // if false then seller
    },
    
   
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const Seller = mongoose.models.sellers || mongoose.model("sellers", sellerSchema);

export default Seller;
