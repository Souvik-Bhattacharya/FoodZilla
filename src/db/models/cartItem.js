const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    uid: String,
    fid: String,
    quantity: Number,
    amount: Number
});

export const Cartitem = mongoose.models.cartitem || mongoose.model("cartitem", cartSchema);