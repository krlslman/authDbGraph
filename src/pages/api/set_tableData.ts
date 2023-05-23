// import { NextApiRequest, NextApiResponse } from 'next';
// import { InsertOneResult } from 'mongodb';
// import clientPromise from '../../lib/mongodb';

// export default async function set_tableData(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { dataFromUi } = req.body;

//     const client = await clientPromise;
//     const db = client.db("AdminDashboardDB");
//     const result: InsertOneResult<Document> = await db.collection("AdminDashboardCollection").insertOne({ dataFromUi });

//     if (result.insertedId) {
//       res.status(200).json({ success: true });
//     } else {
//       throw new Error("Failed to insert data into the database");
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ success: false, error: e.message });
//   }
// }
