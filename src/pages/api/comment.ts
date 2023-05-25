import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { user } = req.query;
    // const userMail = user?user.toLowerCase():"dfs"
    try {
      const client = await clientPromise;
      const db = client.db("AdminDashboardDB");
      const collection = db.collection("comments");
      // Retrieve all comments from the database
      const comments = await collection.find().toArray();

      // Loop through each comment and determine if it is liked by the user
      const commentsNew = comments.map((comment) => {
        const likeList = comment.likeList || [];
        const isLiked = likeList.includes(user);
        let likesCount = comment.likeList.length;
        return {
          ...comment,
          isLiked,
          likesCount
        }
      });      
      return res.status(200).json(commentsNew);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
