import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("AdminDashboardDB");
    const Data = await db
      .collection("comments")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
      
    const serializedData = Data.map((row) => {
      return {
        ...row,
        _id: row._id.toString(), // Convert ObjectId to string
      };
    });

    res.status(200).json({ datam: serializedData });
  } catch (e) {
    console.error(e);
    // res.status(500).json("x");
  }
}
