import mongoose, { models } from "mongoose";
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: [true, "Please give a Product Name"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Please provide Price"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    
    date: {
        type:Date,
        default:Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    productSeller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Reference to the Seller model
        required: true
    },
    productBuyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Seller model
        required: true
    },



    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const Products = mongoose.models.products || mongoose.model("products", productSchema);

export default Products;
