const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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

export const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);