import { NextRequest } from "next/server";

import { connectToDatabase } from "@/utils/db";

export const POST = async (request: NextRequest) => {
  const { id } = await request.json();
  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  const data = await collection.findOne({ id: Number(id) }, { projection: { _id: 0, thumbnail: 0 } });
  return Response.json({ error: false, data });
};