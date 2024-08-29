import { Client } from "@notionhq/client";
import { ImageBlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

import PageContent from "./pageContent";

type Props = {
  id: string;
};
const Page = async ({ params }: {
  params: Props;
}) => {
  if(!params.id) return;

  const block_id = params.id;

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  
  const [pages, blocks] = await Promise.all([
    notion.pages.retrieve({ page_id: block_id }),
    notion.blocks.children.list({ block_id }),
  ]);

  const images = (blocks.results as ImageBlockObjectResponse[]).map((block) => {
    if(block.type !== "image") return;
    if(block.image.type !== "file") return;
    return block.image.file.url;
  }).filter((url) => url !== undefined);

  const page = () => {
    const page = pages as PageObjectResponse;
    const properties = page.properties;
    if(properties.Name.type !== "title") return "";
    const title = properties.Name.title[0].plain_text;
    if(properties.Tags.type !== "multi_select") return "";
    const tags = properties.Tags.multi_select.map((tag) => tag.name).join(", ");
    return `${title} - ${tags}`;
  };

  return (
    <PageContent res={{ title: page(), images }} />
  );
};

export default Page;