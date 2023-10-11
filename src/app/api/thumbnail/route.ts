import { NextRequest } from "next/server";

import { connectToDatabase } from "@/utils/db";

export const POST = async (request: NextRequest) => {
  const { id } = await request.json();
  const client = await connectToDatabase();
  const dataCollection = await client.db().collection("data");
  const imageCollection = await client.db().collection("images");

  const { thumbnail } = await dataCollection.findOne({ id }, { projection: { _id: 0, thumbnail: 1 } });
  const { image } = await imageCollection.findOne({ _id: thumbnail }, { projection: { _id: 0, image: 1 }});

  return Response.json({ error: false, thumbnail: image });
};