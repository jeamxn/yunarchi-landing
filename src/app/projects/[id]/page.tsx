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
  const [images, setImages] = React.useState<string[]>([]);
  const [i, setI] = React.useState(0);

  const init = async () => {
    const { data: res } = await axios({
      method: "POST",
      url: "/api/project",
      data: {
        id: params.id
      }
    });
    setImages(new Array(res.data.subImages.length).fill(""));

    const promises = [];
    for(const [i, e] of res.data.subImages.entries()) {
      promises.push(
        new Promise((resolve) => {
          axios({
            method: "POST",
            url: "/api/image",
            data: {
              id: e,
              index: i
            }
          }).then(({ data: { image } }) => {
            images[i] = image;
            resolve(setImages([...images]));
          });
        })
      );
    }

    setData(res.data);
  };

  React.useEffect(() => {
    if(!params.id) return;
    init();
  }, [params.id]);

  return data && (
    <Main className={styles.container}>
      <div className={images[i] ? styles.imageBox : styles.imageCover}>
        {
          images.length ? <Image
            alt="project image"
            src={images[i]}
            width={630}
            height={420}
            className={styles.image}
            onClick={() => setI((prv) => {
              if(prv === images.length - 1) return 0;
              return prv + 1;
            })}
            style={{
              background: images[i] ? "#fff" : "",
              opacity: images[i] ? "1" : "",
            }}
          /> : null
        }
      </div>
      <div className={styles.infoName}>{data.title}</div>
    </Main>
  );
};

export default Page;