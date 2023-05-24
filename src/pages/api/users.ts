import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { InsertOneResult } from "mongodb";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("AdminDashboardDB");
      // Get the user data from the request body
      const userData = req.body;
      // Insert the user into the users collection
      const result: InsertOneResult<Document> = await db
        .collection("users")
        .insertOne({ userData });
      // const result = await collection.insertOne(userData);

      if (result.insertedId) {
        res.status(201).json({ message: "User created successfully" });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    } catch (e) {
      console.error("Failed to create user:", e);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// By default, Next.js does not parse the request body for API routes. 
// To enable body parsing, you can use the next-connect package or the micro middleware. 
