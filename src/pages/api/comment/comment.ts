import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { FindOneAndUpdateOptions } from "mongodb";
const { ObjectId, getCurrentUser } = require("mongodb");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    /* try {
      const client = await clientPromise;
      const db = client.db("AdminDashboardDB");
      const Data = await db
        .collection("comments")
        .find({})
        .sort({ metacritic: -1 })
        .toArray();
        
      const serializedData = Data.map((row) => {
        return {
          ...row,
          _id: row._id.toString(), // Convert ObjectId to string
        };
      });

      res.status(200).json({ datam: Data });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    } */


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
        const bune =  likeList;
        const isLiked = likeList.includes(user);
        return {
          ...comment,
          isLiked,
          bune
        }
      });
      // const datam = [...commentsNew]
      // Include the isLiked information in the API response
      
      return res.status(200).json(commentsNew);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
