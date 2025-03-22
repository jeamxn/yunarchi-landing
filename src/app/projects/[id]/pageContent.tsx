/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Project.module.css";

const PageContent = ({ 
  res,
}: {
  res: {
    title: string;
    images: string[];
  };
}) => {
  const [imgLoading, setImgLoading] = React.useState(true);
  const [i, setI] = React.useState(0);

  return (
    <Main className={styles.container}>
      <div className={!imgLoading ? styles.imageBox : styles.imageCover}>
        {
          res.images ? <img
            alt="project image"
            src={res.images[i]}
            width={630}
            height={420}
            className={styles.image}
            onClick={() => setI((prv) => {
              setImgLoading(true);
              if(prv === res.images.length - 1) return 0;
              return prv + 1;
            })}
            onLoad={() => setImgLoading(false)}
            style={{
              background: !imgLoading ? "#fff" : "",
              opacity: !imgLoading ? "1" : "",
            }}
          /> : null
        }
      </div>
      <div className={styles.infoName}>{res.title}</div>
    </Main>
  );
};

export default PageContent;