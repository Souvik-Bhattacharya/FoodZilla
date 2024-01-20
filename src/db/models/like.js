const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    fid: String,
    uid: String
});

export const Like = mongoose.models.like || mongoose.model("like", likeSchema);