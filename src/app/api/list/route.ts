import type { NextRequest } from "next/server";

import { connectToDatabase } from "@/utils/db";

export type BodyData = {
  title: string;
  thumbnail: string;
  subImages: string[];
}

export type ResponseData = {
  id: number;
  order: number;
  title: string;
};

export const GET = async (request: NextRequest) => {
  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  const data = await collection.find({}, { projection: { id: 1, title: 1, order: 1 } }).toArray();
  return Response.json({ error: false, data });
};
