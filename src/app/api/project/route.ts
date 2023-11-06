import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type ResponseData = {
  id: string;
  cover: string;
};

export const GET = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  const databases = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECTS as string,
  });
  const list = (databases.results as DatabaseObjectResponse[]).map((page) => {
    if(page.properties.No.type !== "number" || !page.cover) return;
    return {
      // _origin: page,
      no: Number(page.properties.No.number),
      id: page.id,
      cover: page.cover.type === "external" ? page.cover.external.url : page.cover.file.url,
    };
  }).filter((page) => page !== undefined).sort((a, b) => {
    if(!a || !b) return 0;
    return a.no - b.no;
  });

  return Response.json(list, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache",
      "CDN-Cache-Control": "no-cache",
      "Vercel-CDN-Cache-Control": "no-cache",
    },
  });
};