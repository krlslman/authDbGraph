import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
// const { ObjectID } = require('mongodb');
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { newLiker, id } = req.body.newdata;
    const commentId = id as string;

    try {
      const client = await clientPromise;
      const db = client.db("AdminDashboardDB");
      const collection = db.collection("comments");

      // Find the comment by its ID
      const comment = await collection.findOne({
        _id: new ObjectId(commentId),
      });

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      const likeList = comment.likeList || [];
      let likesCount = comment.likeList.length;

      const userIndex = likeList.indexOf(newLiker[0]);
      if (userIndex > -1) {  // If liked
        likeList.splice(userIndex, 1); // remove user
        likesCount>0 && (likesCount -= 1);
      } else {  // If not liked        
        likeList.push(newLiker[0]); // add user
        likesCount += 1;
      }

      // Update the likeList array based on the new likeList data
      let updatedComment = await collection.findOneAndUpdate(
        { _id: new ObjectId(commentId) },
        { $set: { likeList } },
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
