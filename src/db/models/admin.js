const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

export const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);