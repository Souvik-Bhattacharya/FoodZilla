const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    image: String,
    category: String,
    name: String,
    desc: String,
    price: Number,
    likes: Number
});

export const Food = mongoose.models.food || mongoose.model("food", foodSchema);