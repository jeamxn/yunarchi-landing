"use client";

import type { ResponseData } from "@/app/api/project/route";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Projects.module.css";

const Page = () => {
  const [data, setData] = React.useState<ResponseData[]>([]);
  const init = async () => {
    const { data: res } = await axios({
      method: "POST",
      url: "/api/project",
    });
    setData(res);
  };

  React.useEffect(() => {
    init();
  }, []);

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
              <Image
                src={e.cover}
                alt=""
                width={300}
                height={200}
                className={styles.thumbnail}
                loading="lazy"
                onLoadStart={(e) => {
                  e.currentTarget.style.opacity = "";
                  e.currentTarget.style.background = "";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.background = "#fff";
                }}
              />
            </Link>
          );
        }) : (
          <div className={styles.loading}>
            Loading...
          </div>
        )
      }
    </Main>
  );
};

export default Page;