const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    image: String,
    name: String,
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);