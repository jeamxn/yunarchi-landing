import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

import { connectToDatabase } from "@/utils/db";

export const POST = async (request: NextRequest) => {
  const { id } = await request.json();
  const client = await connectToDatabase();
  const imageCollection = await client.db().collection("images");

  const { image } = await imageCollection.findOne({ _id: new ObjectId(id) }, { projection: { _id: 0, image: 1 }});

  return Response.json({ error: false, image });
};
