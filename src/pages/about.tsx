import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import styles from "@/styles/pages/Home.module.css";


const Home = () => {
  return (
    <>
      <DefaultHead />
      <main className={styles.main}>
        <Header />
      </main>
    </>
  );
};

export default Home;