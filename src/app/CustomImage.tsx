/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import styles from "@/styles/pages/Projects.module.css";

const CustomImage = ({
  src
}: {
  src: string;
}) => (
  <img
    src={src}
    alt=""
    width={300}
    height={200}
    className={styles.thumbnail}
    loading="lazy"
    onLoadStart={(e) => {
      e.currentTarget.style.opacity = "";
      e.currentTarget.style.background = "";
    }}
    onLoad={(e) => {
      e.currentTarget.style.opacity = "1";
      e.currentTarget.style.background = "#fff";
    }}
  />
);

export default CustomImage;