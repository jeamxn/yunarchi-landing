"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

import styles from "@/styles/components/Load.module.css";
import { loadingAtom } from "@/utils/states";

const Loading = ({
  fixed = true,
}: {
  fixed?: boolean,
}) => {
  const [loading, setLoading] = useRecoilState(loadingAtom);

  const pathname = usePathname();
  const handleComplete = () => {
    setTimeout(() => { 
      setLoading(false);
    }, 500);
  };
  React.useEffect(() => {
    window.addEventListener("load", handleComplete);
    return () => {
      window.removeEventListener("load", handleComplete);
    };
  }, []);
  React.useEffect(() => {
    handleComplete();
  }, [pathname]);

  return (
    <div className={styles.divtop}>
      <div
        className={styles.divinn}
        style={{
          width: loading ? "100%" : "0",
          transitionProperty: loading ? "all" : "none",
        }}
      />
    </div>
  );
};

export default Loading;