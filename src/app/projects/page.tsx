"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { ResponseData } from "@/app/api/list/route";
import { Main } from "@/components";
import styles from "@/styles/pages/Projects.module.css";

const Page = () => {
  const router = useRouter();
  const [data, setData] = React.useState<ResponseData[]>([]);
  const init = async () => {
    const { data: res } = await axios({
      method: "GET",
      url: "/api/list",
    });
    const datac = res.data as ResponseData[];
    setData([...datac]);
    
    const promises = [];
    for (const e of datac) {
      promises.push(
        new Promise((resolve) => {
          axios({
            method: "POST",
            url: "/api/thumbnail",
            data: {
              id: e.id,
            }
          }).then(({ data: { thumbnail } }) => {
            e.thumbnail = thumbnail;
            resolve(setData([...datac]));
          });
        })
      );
    }
    console.log(promises);
    await Promise.all(promises);
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
                alt=""
                width={300}
                height={200}
                className={styles.thumbnail}
                style={{
                  background: e.thumbnail ? "#fff" : "",
                  opacity: e.thumbnail ? "1" : "",
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