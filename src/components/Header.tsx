"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

import styles from "@/styles/components/Header.module.css";
import { menuAtom } from "@/utils/states";

import Linker from "./Linker";

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
  const pathname = usePathname();

  React.useEffect(() => {
    const menu = menus.findIndex(m => m.link === `/${pathname.split("/")[1]}`);
    setMenu(menu);
  }, [pathname]);

  return (
    <div className={styles.header}>
      <Linker
        className={styles.titleBox} 
        href={"/"}
        prefetch
      >
        <div className={styles.title1}>D.G. YUN-ARCHITECTS</div>
        <div className={styles.title2}>디자인그룹윤건축사사무소</div>
      </Linker>
      <div className={styles.menu}>
        {
          menus.map((m, i) => (
            <Linker
              key={i}
              href={m.link}
              className={styles.menuItem}
              style={{
                opacity: menu === i || (m.name === "PROJECTS" && pathname.split("/")[1] === "projects") ? 1 : ""
              }}
            >
              {m.name}
            </Linker>
          ))
        }
      </div>
    </div>
  );
};

export default Header;	