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
  const [display, setDisplay] = React.useState<"block" | "none">("block");
  const [i, setI] = React.useState(0);

  const getData = async () => {
    const { data }: { 
      data: { 
        [key: string]: Data; 
      }
    } = await axios.get("/api/list");
    setData(data[url]);
    setDisplay("none");
  };

  React.useEffect(() => {
    getData();
  }, [url]);

  React.useEffect(() => {
    if (data && i > data.images.length - 1) {
      setI(0);
    }
  }, [i]);

  return data && (
    <>
      <DefaultHead>
        <title>Project - {data.info.name} :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
        <div className={styles.container}>
          <div className={styles.imageBox}>
            {
              data.images.length > 1 && data.images.map((image, index) => (
                <div key={index} className={styles.imageCover}>
                  <Image
                    alt="project image"
                    src={`/projects/${url}/${image}`}
                    width={630}
                    height={420}
                    className={styles.image}
                    style={{ 
                      display: i === index ? "block" : display,
                    }}
                    onClick={() => setI(i + 1)}
                    onLoadingComplete={(e) => {
                      e.style.background = "#fff";
                      e.style.opacity = "1";
                    }}
                  />
                </div>
              ))
            }
          </div>
          <div className={styles.infoName}>{data.info.name}</div>
        </div>
      </main>
    </>
  );
};

export default Project;