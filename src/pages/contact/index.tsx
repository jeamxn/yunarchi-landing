import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import Map from "@/components/Map";
import styles from "@/styles/pages/Contact.module.css";

const Contact = () => {
  return (
    <>
      <DefaultHead>
        <title>Contact :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
        <div className={styles.container}>
          <div className={styles.address}>
            <div className={styles.title}>Address</div>
            <div className={styles.desc}>
              <div className={styles.leftright}>
                <div>부산광역시 수영구 남천1동</div>
                <div>광남로10번길 2 동남빌딩 4,5층</div>
              </div>
              <div className={styles.leftright}>
                <div>+82 051 911 9011</div>
                <div>yun-archi16@daum.net</div>
              </div>
            </div>
          </div>
          <div className={styles.address}>
            <div className={styles.title}>Map</div>
            <div className={styles.map}>
              <Map /> 
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;