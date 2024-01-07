const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    uid: String,
    user: String,
    address: String,
    pincode: Number,
    date: String,
    image: String,
    name: String,
    price: Number,
    quantity: Number,
    amount: Number
});

export const Order = mongoose.models.order || mongoose.model("order", orderSchema);