import axios from "axios";
import { NextRequest } from "next/server";

import { adminList } from "@/app/api/edit/route";
import { connectToDatabase } from "@/utils/db";

export type ResponseData = {
  id: number;
  order: number;
  title: string;
  thumbnail: string;
};

export const GET = async () => {
  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  const data: ResponseData[] = await collection.find({}, { projection: { _id: 0, id: 1, title: 1, order: 1 } }).toArray();
  return Response.json({ 
    error: false, 
    data: data.map((item) => ({ ...item, thumbnail: "" })),
  });
};

export const POST = async (request: NextRequest) => {
  const accessToken = request.cookies.get("access_token")?.value;
  const { data: tokenInfo } = await axios({
    method: "get",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if(!tokenInfo.id || !adminList.includes(tokenInfo.id)) {
    return Response.json({ error: true, message: "token failed" });
  }

  const body: ResponseData[] = await request.json();
  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  for(let i = 0; i < body.length; i++) {
    const { id, order } = body[i];
    await collection.updateOne({ id }, { $set: { order } });
  }
  return Response.json({ error: false, body });
};