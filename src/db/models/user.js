const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

export const User = mongoose.models.user || mongoose.model("user", userSchema);