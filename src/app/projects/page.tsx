"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Projects.module.css";

import { ResponseData } from "../api/main/route";

const Page = () => {
  const router = useRouter();

  const [data, setData] = React.useState<ResponseData[]>([]);

  const init = async () => {
    const { data: res } = await axios({
      method: "GET",
      url: "/api/main",
    });
    setData(res.data);
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Main className={styles.main}>
      {
        data.map((e, i) => {
          return (
            <div 
              key={i}
              className={styles.thumbnailBox} 
              onClick={() => {
                router.push(`/projects/${e.id}`);
              }}
            >
              <Image
                src={e.thumbnail}
                alt="project image"
                width={300}
                height={200}
                className={styles.thumbnail}
                onLoadingComplete={(e) => {
                  e.style.background = "#fff";
                  e.style.opacity = "1";
                }}
              />
            </div>
          );
        })
      }
    </Main>
  );
};

export default Page;