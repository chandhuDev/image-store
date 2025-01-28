const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category: String,
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
