import axios from "axios";
import React from "react";

import { ResponseData } from "@/app/api/list/route";
import styles from "@/styles/admin/Main.module.css";

import Item from "./Item";
import Modal from "./Modal";

const Important = ({
  token
}: {
  token: string;
}) => {
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
    init();
  }, []);

  return (
    <>
      <div 
        className={styles.tableButton}
        onClick={() => setShowModal(true)}
      >새 프로젝트 추가하기</div>

      <div className={styles.list}>
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
                  states={[projects, setProjects]}
                />
              ))
            }
          </tbody>
        </table>
      </div>

      <div className={styles.savebutton}>
        <div className={styles.button}>저장하기</div>
      </div>
      <Modal states={[showModal, setShowModal]} />
    </>
  );
};

export default Important;