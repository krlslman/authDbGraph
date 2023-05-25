import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user, text, likeList, timestamp } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('AdminDashboardDB');
      const collection = db.collection('comments');

      // Insert the comment into the database
      const insertedComment = await collection.insertOne({
        user,
        text,
        likeList,
        timestamp,
      });

      if (!insertedComment) {
        return res.status(500).json({ message: 'Failed to post comment' });
      }

      return res.status(201).json({ message: 'Comment posted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
