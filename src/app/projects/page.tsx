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
    setData(datac);
    
    const promises = [];
    for (const e of datac) {
      promises.push(
        axios({
          method: "POST",
          url: "/api/thumbnail",
          data: {
            id: e.id,
          }
        })
      );
    }
    const ress = await Promise.all(promises);
    for(let i = 0; i < ress.length; i++) {
      const e = ress[i];
      const { data: res } = e;
      const { thumbnail } = res;
      
      for (const e of datac) {
        if (e.id === i + 1) {
          e.thumbnail = thumbnail;
          break;
        }
      }
    }
    setData(datac);
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