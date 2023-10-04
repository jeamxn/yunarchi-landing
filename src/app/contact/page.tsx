import { Main } from "@/components";
import styles from "@/styles/pages/Contact.module.css";

import Map from "./Map";

const Page = () => {
  return (
    <Main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.address}>
          <div className={styles.title}>Address</div>
          <div className={styles.desc}>
            <div className={styles.leftright}>
              <div className={[styles.ls, styles.lss].join(" ")}>부산광역시 수영구 남천1동 광남로10번길 2 동남빌딩 4,5층</div>
            </div>
            <div className={styles.leftright}>
              <div className={styles.ls}>
                <a href="tel:0519119011">+82 051 911 9011</a>
              </div>
              <div className={styles.ls}>
                <a href="mailto:yun-archi16@daum.net">yun-archi16@daum.net</a>
              </div>
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
    </Main>
  );
};

export default Page;