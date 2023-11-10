"use client";

import axios from "axios";
import Image from "next/image";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/pages/Project.module.css";

type Props = {
  id: number;
};
const Page = ({ params }: {
  params: Props;
}) => {
  const [imgLoading, setImgLoading] = React.useState(false);
  const [data, setData] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);
  const [i, setI] = React.useState(0);

  const init = async () => {
    setImgLoading(true);
    const { data: res } = await axios({
      method: "GET",
      url: `/api/project/${params.id}`,
    });
    setImages(res.images);
    setData(res.title);
  };

  React.useEffect(() => {
    if(!params.id) return;
    init();
  }, [params.id]);

  return (
    <Main className={styles.container}>
      <div className={!imgLoading ? styles.imageBox : styles.imageCover}>
        {
          data ? <Image
            alt="project image"
            src={images[i]}
            width={630}
            height={420}
            className={styles.image}
            onClick={() => setI((prv) => {
              setImgLoading(true);
              if(prv === images.length - 1) return 0;
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
      <div className={styles.infoName}>{data}</div>
    </Main>
  );
};

export default Page;