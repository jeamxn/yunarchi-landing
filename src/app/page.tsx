"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Main } from "@/components";
import styles from "@/styles/page.module.css";

const Page = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/projects");
  }, []);
  return (
    <Main className={styles.main} />
  );
};

export default Page;