const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    category: String,
    name: String,
    desc: String,
    price: Number
});

export const Food = mongoose.models.food || mongoose.model("food", foodSchema);