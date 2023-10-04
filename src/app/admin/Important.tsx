import type { ResponseData } from "@/app/api/list/route";

import axios from "axios";
import React from "react";

import styles from "@/styles/admin/Main.module.css";

import Item from "./Item";
import Modal from "./Modal";

const Important = () => {
  const [projects, setProjects] = React.useState<ResponseData[]>([]);
  const [showModal, setShowModal] = React.useState(false);

  const init = async () => {
    const { data } = await axios({
      method: "GET",
      url: "/api/list",
    });
    setProjects(data.data);
  };

  React.useEffect(() => {
    if(!showModal) {
      init();
    }
  }, [showModal]);

  const save = async () => {
    const { data } = await axios({
      method: "POST",
      url: "/api/list",
      data: projects,
    });
    if(data.error) {
      alert("저장에 실패했습니다.");
      return;
    }
    alert("저장되었습니다.");
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>순번</th>
            <th colSpan={4}>프로젝트</th>
          </tr>
        </thead>
        <tbody>
          {
            projects.sort((a, b) => a.order - b.order).map((project, index) => (
              <Item
                key={project.id} 
                index={index + 1} 
                title={project.title} 
                init={init}
                states={[projects, setProjects]}
              />
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div className={styles.tableButton} onClick={() => setShowModal(true)}>새 프로젝트 추가하기</div>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className={styles.savebutton}>
        <div className={styles.button} onClick={save}>저장하기</div>
      </div>
      <Modal states={[showModal, setShowModal]} />
    </>
  );
};

export default Important;