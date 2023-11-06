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
  const list = (databases.results as DatabaseObjectResponse[]).map((page) => ({
    // _origin: page,
    id: page.id,
    cover: page.cover && (page.cover.type === "external" ? page.cover.external.url : page.cover.file.url),
  }));
  return Response.json(list.reverse());
};