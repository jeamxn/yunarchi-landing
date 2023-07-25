import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import Header from "@/components/Header";
import styles from "@/styles/pages/About.module.css";


const About = () => {
  return (
    <>
      <DefaultHead>
        <title>About :: YUN Architects</title>
      </DefaultHead>
      <main className={["main", styles.main].join(" ")}>
        <Header />
        <div className={styles.container}>
          <div className={styles.desc}>윤건축사사무소는 사용자 요구에 부합하는 공간을 만들어내는 그룹입니다. 사용자에 맞추어 설계하여 창의적인 공간과 가치 있는 공간 제공을 목표로 합니다.</div>
          <div className={styles.person}>
            <div className={styles.name}>장윤선</div>
            <div className={styles.careerBox}>
              {
                [
                  "건축사(대한건축사협회정회원)",
                  "부경대학교 건축학과 겸임교수",
                  "CVS(Certified Value Specialist)",
                  "VMP(가치혁신전문가)",
                  "녹색건축인증전문자",
                  "부산광역시, 양산시 공공건축가(2기)",
                  "학교공간혁신촉진자",
                  "부산광역시 건축정책위원",
                  "부산광역시 건설기술심의위원",
                  "부산광역시 소방청사자문위원",
                  "경상남도 지방건설심의위원",
                  "수영구,북구,남구,영도구 건축심의위원"
                ].map((e, index) => {
                  return (
                    <div className={styles.career} key={index}>{e}</div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;