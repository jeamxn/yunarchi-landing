import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Projects.module.css";

import CustomImage from "./CustomImage";

const Page = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  const databases = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_PROJECTS as string,
  });
  const data = (databases.results as DatabaseObjectResponse[]).map((page) => {
    if(page.properties.No.type !== "number" || !page.cover) return;
    return {
      no: Number(page.properties.No.number),
      id: page.id,
      cover: page.cover.type === "external" ? page.cover.external.url : page.cover.file.url,
    };
  }).filter((page) => page !== undefined).sort((a, b) => {
    if(!a || !b) return 0;
    return a.no - b.no;
  });

  return (
    <Main className={styles.main}>
      {
        data.length ? data.map((e, i) => {
          return (
            <Link
              href={`/projects/${e.id}`} 
              key={i}
              className={styles.thumbnailBox} 
            >
              <CustomImage src={e.cover} />
            </Link>
          );
        }) : (
          <div className={styles.loading}>
            데이터가 없습니다.
          </div>
        )
      }
    </Main>
  );
};

export default Page;