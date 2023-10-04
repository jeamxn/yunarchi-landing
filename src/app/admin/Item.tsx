import React from "react";

import { ResponseData } from "@/app/api/list/route";
import styles from "@/styles/admin/Main.module.css";

const Item = ({
  index,
  title,
  states,
}: {
  index: number;
  title: string;
  states: [ResponseData[], React.Dispatch<React.SetStateAction<ResponseData[]>>];
}) => {
  const [projects, setProjects] = states;
  const i = index - 1;

  const up = () => {
    if (i === 0) return;
    const temp = projects[i].order;
    projects[i].order = projects[i - 1].order;
    projects[i - 1].order = temp;
    setProjects([...projects]);
  };
  const down = () => {
    if (i === projects.length - 1) return;
    const temp = projects[i].order;
    projects[i].order = projects[i + 1].order;
    projects[i + 1].order = temp;
    setProjects([...projects]);
  };

  return (
    <tr>
      <td className={styles.tableText}>{index}</td>
      <td className={styles.tableText}>{title}</td>
      <td className={styles.tableButton} onClick={up}>위로</td>
      <td className={styles.tableButton} onClick={down}>아래로</td>
      <td className={styles.tableButton}>수정</td>
    </tr>
  );
};

export default Item;