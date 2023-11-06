/* eslint-disable @next/next/no-img-element */
"use client";

import type { ResponseData } from "@/app/api/project/route";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Projects.module.css";


const Page = () => {
  const router = useRouter();
  const [data, setData] = React.useState<ResponseData[]>([]);
  const init = async () => {
    const { data: res } = await axios({
      method: "GET",
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
            <div 
              key={i}
              className={styles.thumbnailBox} 
              onClick={() => {
                router.push(`/projects/${e.id}`);
              }}
            >
              <img
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
            </div>
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