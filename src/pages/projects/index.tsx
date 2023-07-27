import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import styles from "@/styles/pages/Projects.module.css";
import { Data } from "@/utils/types";

const Home = () => {
  const [data, setData] = React.useState<{ 
    [key: string]: Data; 
  } | null>(null);
  const router = useRouter();

  const getData = async () => {
    const { data }: { 
      data: { 
        [key: string]: Data; 
      }
    } = await axios.get("/api/list");
    setData(data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DefaultHead>
        <title>Projects :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
        <div className={styles.container}>
          {
            data && Object.entries(data).map((e, i) => {
              const url: string = e[0];
              const data: Data = e[1];
              return (
                <div 
                  key={i}
                  className={styles.thumbnailBox} 
                  onClick={() => {
                    router.push(`/projects/${url}`);
                  }}
                >
                  <Image
                    src={`/projects/${url}/${data.info.thumbnail}`}
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
        </div>
      </main>
    </>
  );
};

export default Home;