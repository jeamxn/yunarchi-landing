import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import styles from "@/styles/pages/Contact.module.css";

const Contact = () => {
  return (
    <>
      <DefaultHead>
        <title>Contact :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
        <div className={styles.contact}>
          
        </div>
      </main>
    </>
  );
};

export default Contact;