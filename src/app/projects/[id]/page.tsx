"use client";

import axios from "axios";
import Image from "next/image";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Project.module.css";

const initData: {
  id: number;
  order: number;
  title: string;
  thumbnail: string;
  subImages: string[];
} = {
  id: 0,
  order: 0,
  title: "",
  thumbnail: "",
  subImages: []
};

const Page = ({ params }: {
  params: {
    id: number;
  };
}) => {
  const [data, setData] = React.useState(initData);
  const [i, setI] = React.useState(0);

  const init = async () => {
    const { data: res } = await axios({
      method: "POST",
      url: "/api/project",
      data: {
        id: params.id
      }
    });
    setData(res.data);
  };

  React.useEffect(() => {
    if(!params.id) return;
    init();
  }, [params.id]);

  return data && (
    <Main className={styles.container}>
      <div className={styles.imageBox}>
        {
          data.subImages.length ? <Image
            alt="project image"
            src={data.subImages[i]}
            width={630}
            height={420}
            className={styles.image}
            onClick={() => setI((prv) => {
              if(prv === data.subImages.length - 1) return 0;
              return prv + 1;
            })}
            onLoadingComplete={(e) => {
              e.style.background = "#fff";
              e.style.opacity = "1";
            }}
          /> : null
        }
      </div>
      <div className={styles.infoName}>{data.title}</div>
    </Main>
  );
};

export default Page;