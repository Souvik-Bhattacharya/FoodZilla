const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    uid: String,
    image: String,
    name: String,
    price: Number,
    quantity: Number,
    amount: Number
});

export const Cart = mongoose.models.cart || mongoose.model("cart", cartSchema);