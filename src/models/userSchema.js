const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  likesCount: { type: Number, default: 0 },
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
