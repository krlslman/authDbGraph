import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("AdminDashboardDB");
    const tableData = await db
      .collection("AdminDashboardCollection")
      .find({})
      .sort({ metacritic: -1 })
      .limit(1)
      .toArray();
      
    const serializedMovies = tableData.map((row) => {
      return {
        ...row,
        _id: row._id.toString(), // Convert ObjectId to string
      };
    });

    res.status(200).json({ isConnected: true, datam: serializedMovies });
  } catch (e) {
    console.error(e);
    res.status(500).json({ isConnected: false });
  }
}
