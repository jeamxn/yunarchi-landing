import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import styles from "@/styles/pages/Home.module.css";

const Home = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/projects");
  }, []);

  return (
    <>
      <DefaultHead>
        <title>Projects :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
      </main>
    </>
  );
};

export default Home;