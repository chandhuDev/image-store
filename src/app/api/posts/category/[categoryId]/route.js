import { connectDB } from "../../../../utils/db";
import Category from "../../../../models/categorySchema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { categoryId } = req.query;

    const posts = await Category.findById(categoryId);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
}
