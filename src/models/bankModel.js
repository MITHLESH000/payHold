import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: [true, "Enter Account Number"],
    },
    accountHolder: {
        type: String,
        required: [true, "Provide Account Holder Name"],
    },
    bankName: {
        type: String,
        required: [true, "Plese provide Bank Name"],
    },
    ifsc: {
        type: String,
        required: [true, "IFSC code Required"],
        unique: [true, ""],
    },
    upiId: {
        type: String,
        required: [true, "Enter UPI Id"],
        unique: true,
    },
    isVerifiedAccount: {
        type: Boolean,
        default: false
    },
    accountType: {
        type: String,
        enum: ["user", "seller"],
        required: [true, "Please specify the account type"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
            validator: function (value) {
                return this.accountType === "user" ? value != null : true;
            },
            message: "User ID is required for user accounts",
        },
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        validate: {
            validator: function (value) {
                return this.accountType === "seller" ? value != null : true;
            },
            message: "Seller ID is required for seller accounts",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
});
const BankAccount =
    mongoose.models.BankAccounts ||
    mongoose.model("BankAccounts", bankAccountSchema);

export default BankAccount;
