import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
// const { ObjectID } = require('mongodb');
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { newLiker } = req.body.newdata;
    const { id } = req.query;

    try {
      const client = await clientPromise;
      const db = client.db("AdminDashboardDB");
      const collection = db.collection("comments");
      const commentId = id as string; // Convert the comment ID to string

      // Find the comment by its ID
      const comment = await collection.findOne({
        _id: new ObjectId(commentId),
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      const likeList = comment.likelist || [];

      const userIndex = likeList.indexOf(newLiker[0]);
      if (userIndex > -1) {
        // If liked, unlike by removing from likelist
        likeList.splice(userIndex, 1);
      } else {
        // If not liked, like by adding to likelist
        likeList.push(newLiker[0]);
      }

      // Update the likelist array based on the new likelist data
      const updatedComment = await collection.findOneAndUpdate(
        { _id: new ObjectId(commentId) },
        // { $addToSet: { likelist: newLiker[0] } },
        { $set: { likeList } }, // Update the likeList array
        { returnDocument: "after" }
      );

      if (!updatedComment.value) {
        return res.status(404).json({ message: "Failed to like comment" });
      }

      return res.status(200).json({ message: "Comment liked/unliked successfully" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
