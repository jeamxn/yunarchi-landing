import type { NextRequest } from "next/server";

import axios from "axios";

import { connectToDatabase } from "@/utils/db";

export type BodyData = {
  title: string;
  thumbnail: string;
  subImages: string[];
}

export const adminList = JSON.parse(process.env.ADMIN_NUM || "[]");

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

  //body 내용 가져오기
  const body: BodyData = await request.json();
  if(!body.title || !body.thumbnail || !body.subImages) {
    return Response.json({ error: true, message: "invalid body" });
  }

  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  const count = await collection.countDocuments();
  await collection.insertOne({
    id: count + 1,
    order: count + 1,
    title: body.title,
    thumbnail: body.thumbnail,
    subImages: body.subImages,
  });

  return Response.json({ error: false, tokenInfo: tokenInfo.id, body });
};

export const DELETE = async (request: NextRequest) => {
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

  const { id } = await request.json();
  if(!id) {
    return Response.json({ error: true, message: "invalid body" });
  }

  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  await collection.deleteOne({ id });

  return Response.json({ error: false });
};