import React from "react";

import styles from "@/styles/components/Loading.module.css";

type Props = {
  show: boolean;
}

const Loading = ({show}: Props) => {
  return show ? (
    <div className={styles.box}>
      <div className={styles.boxInner}>
        <span className={styles.loader}></span>
      </div>
    </div>
  ) : null;
};

export default Loading;