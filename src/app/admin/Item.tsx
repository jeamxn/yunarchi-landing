import axios from "axios";
import React from "react";

import { ResponseData } from "@/app/api/list/route";
import styles from "@/styles/admin/Main.module.css";

const Item = ({
  index,
  title,
  states,
  init,
}: {
  index: number;
  title: string;
  states: [ResponseData[], React.Dispatch<React.SetStateAction<ResponseData[]>>];
  init: () => void;
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

  const deleteone = async () => {
    if(!confirm("삭제하시겠습니까?")) return;
    const { data: res } = await axios({
      method: "DELETE",
      url: "/api/edit",
      data: {
        id: projects[i].id,
      }
    });
    if(res.error) return alert("삭제에 실패했습니다.");
    alert("삭제되었습니다.");
    init();
  };

  return (
    <tr>
      <td className={[styles.tableText, styles.minCell].join(" ")}>{index}</td>
      <td className={styles.tableText}>{title}</td>
      <td className={[styles.tableButton, styles.minCell].join(" ")} onClick={up}>위로</td>
      <td className={[styles.tableButton, styles.minCell].join(" ")} onClick={down}>아래로</td>
      <td className={[styles.tableButton, styles.minCell].join(" ")} onClick={deleteone}>삭제</td>
    </tr>
  );
};

export default Item;