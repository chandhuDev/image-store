const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  like: { type: [String] },
  imageUrl: String,
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;
