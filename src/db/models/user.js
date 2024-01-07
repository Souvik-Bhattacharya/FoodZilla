const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    address: String,
    pincode: String,
    district: String,
    state: String,
    country: String,
    password: String,
    image: String
});

export const User = mongoose.models.user || mongoose.model("user", userSchema);