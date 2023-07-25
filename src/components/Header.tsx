import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

import styles from "@/styles/components/Header.module.css";
import { menuAtom } from "@/utils/states";

const menus = [
  {
    name: "ABOUT",
    link: "/about"
  },
  {
    name: "PROJECTS",
    link: "/"
  },
  {
    name: "CONTACT",
    link: "/contact"
  }
];

const Header = () => {
  const [menu, setMenu] = useRecoilState(menuAtom);
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div 
        className={styles.titleBox} 
        onClick={() => {
          setMenu(1);
          router.push("/");
        }}
      >
        <div className={styles.title1}>D.G. YUN-ARCHITECTS</div>
        <div className={styles.title2}>디자인그룹윤건축사사무소</div>
      </div>
      <div className={styles.menu}>
        {
          menus.map((m, i) => (
            <div
              key={i}
              className={styles.menuItem}
              onClick={() => {
                setMenu(i);
                router.push(m.link);
              }}
              style={{
                opacity: menu === i ? 1 : ""
              }}
            >
              {m.name}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Header;	