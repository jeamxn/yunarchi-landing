import { Client } from "@notionhq/client";

export const GET = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const databases = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECTS as string,
  });

  return Response.json(databases);
};