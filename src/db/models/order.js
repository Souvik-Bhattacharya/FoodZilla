const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    uid: String,
    date: String,
    fid: String,
    name: String,
    category: String,
    desc: String,
    price: Number,
    cid: String,
    quantity: Number,
    amount: Number
});

export const Orderitem = mongoose.models.orderitem || mongoose.model("orderitem", orderSchema);