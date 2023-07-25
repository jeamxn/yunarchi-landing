import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import styles from "@/styles/pages/Project.module.css";
import { Data } from "@/utils/types";

const Project = () => {
  const router = useRouter();
  const { url } = router.query as {url: string};
  const [data, setData] = React.useState<Data | null>(null);
  const [i, setI] = React.useState(0);

  const getData = async () => {
    const { data }: { 
      data: { 
        [key: string]: Data; 
      }
    } = await axios.get("/api/list");
    setData(data[url]);
  };

  React.useEffect(() => {
    getData();
  }, [url]);

  return data && (
    <>
      <DefaultHead>
        <title>Project - {data.info.name} :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
        <div className={styles.container}>
          <div className={styles.imageBox}>
            <Image
              src={`/projects/${url}/${data.images[i]}`}
              alt="project image"
              width={630}
              height={420}
              className={styles.image}
              onClick={() => {
                if (i >= data.images.length - 1) {
                  setI(0);
                } else {
                  setI(i + 1);
                }
              }}
            />
          </div>
          <div className={styles.infoName}>{data.info.name}</div>
        </div>
      </main>
    </>
  );
};

export default Project;