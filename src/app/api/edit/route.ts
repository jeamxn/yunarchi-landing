import type { NextRequest } from "next/server";

import axios from "axios";

import { connectToDatabase } from "@/utils/db";

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
  const body = await request.json();
  if(!body.title) {
    return Response.json({ error: true, message: "invalid body" });
  }

  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  const count = await collection.countDocuments();
  await collection.insertOne({
    id: count + 1,
    order: count + 1,
    title: body.title,
    thumbnail: "",
    subImages: [],
  });

  return Response.json({ error: false, tokenInfo: tokenInfo.id, id: count + 1 });
};

export const PUT = async (request: NextRequest) => {
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

  const body = await request.json();
  if(!body.image || !body.type || !body.id) {
    return Response.json({ error: true, message: "invalid body" });
  }
  if(body.type !== "thumbnail" && body.type !== "subImage") {
    return Response.json({ error: true, message: "invalid type" });
  }

  const client = await connectToDatabase();
  const collection = await client.db().collection("data");
  const { id, image } = body;

  const query = body.type === "thumbnail" ? 
    { $set: { thumbnail: image } } : 
    { $pull: { subImages: image } };
  
  await collection.updateOne({ id }, query);

  return Response.json({ error: false });
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