const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: { type: String },
  name: { type: String },
});
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
