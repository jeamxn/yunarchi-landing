import axios from "axios";
import Image from "next/image";
import React from "react";

import Loading from "@/components/LoadingSpinner";
import styles from "@/styles/admin/Main.module.css";
import convertBase64 from "@/utils/convertBase64";


const initData = {
  title: "",
  thumbnail: "",
  subImages: [] as string[]
};

const Modal = ({
  states
}: {
  states: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = states;

  const [data, setData] = React.useState(initData);
  const [thumbnailUrl, setThumbnailUrl] = React.useState("");
  const [subImages, setSubImages] = React.useState("");

  const init = () => {
    setThumbnailUrl("");
    setSubImages("");
    setData(initData);
  };
  React.useEffect(() => {
    if(!show) init();
  }, [show]);

  const close = async () => {
    if(!data.title) return alert("프로젝트 이름을 입력해주세요.");
    if(!data.thumbnail) return alert("썸네일을 선택해주세요.");
    if(!data.subImages.length) return alert("세부 사진을 선택해주세요.");
    if(!confirm("추가하시겠습니까?")) return;
    setLoading(true);
    try{
      const { data: res } = await axios({
        method: "POST",
        url: "/api/edit",
        data: {
          title: data.title,
          thumbnail: "",
          subImages: [],
        }
      });
      const { id } = res;
      const promises = [
        axios({
          method: "PUT",
          url: "/api/edit",
          data: {
            id,
            type: "thumbnail",
            image: data.thumbnail,
          }
        }),
      ];
      data.subImages.forEach((subImage) => {
        promises.push(
          axios({
            method: "PUT",
            url: "/api/edit",
            data: {
              id,
              type: "subImage",
              image: subImage,
            }
          })
        );
      });
      await Promise.all(promises);
      if(res.error) alert("추가에 실패했습니다.");
      else {
        alert("추가되었습니다.");
        setShow(false);
      }
    } catch {
      alert("추가에 실패했습니다.");
    }
    setLoading(false);
  };

  return show ? (
    <div className={styles.modal}>
      <Loading show={loading} />
      <div className={styles.inner}>
        <div className={styles.title}>프로젝트 추가하기</div>
        
        <div className={styles.vox}>
          <div className={styles.innerTitle}>프로젝트 이름</div>
          <input 
            type="text"
            placeholder="프로젝트 이름"
            value={data.title}
            onChange={(e) => setData({
              ...data,
              title: e.target.value
            })}
            className={styles.input}
          />
        </div>

        <div className={styles.vox}>
          <div className={styles.innerTitle}>썸네일 선택</div>
          <Image 
            src={data.thumbnail}
            alt=""
            width={300}
            height={200}
            className={styles.prevSub}
          />
          <input 
            type="file"
            value={thumbnailUrl}
            onChange={async (e) => {
              setThumbnailUrl(e.target.value);
              if(!e.target.files) return;
              setLoading(true);
              const base64 = await convertBase64(e.target.files[0]) as string;
              setLoading(false);
              setData({
                ...data,
                thumbnail: base64
              });
            }}
            accept="image/*"
            className={styles.input}
          />
        </div>

        <div className={styles.vox}>
          <div className={styles.innerTitle}>세부 사진 선택</div>
          <div className={styles.images}>
            <div className={styles.imagesInner}>
              {
                data.subImages.map((subImage, index) => (
                  <Image 
                    key={index}
                    src={subImage}
                    alt=""
                    width={300}
                    height={200}
                    className={styles.prevSub}
                  />
                ))
              }
            </div>
          </div>
          <input 
            type="file"
            value={subImages}
            onChange={async (e) => {
              setSubImages(e.target.value);
              if(!e.target.files) return;
              setLoading(true);
              const subImages = await Promise.all(
                Array
                  .from(e.target.files)
                  .map(async (file) => await convertBase64(file) as string)
              );
              setLoading(false);
              setData({
                ...data,
                subImages: subImages
              });
            }}
            accept="image/*"
            multiple
            className={styles.input}
          />
        </div>


        <div className={styles.buttons}>
          <input 
            type="button"
            value="취소하기"
            className={styles.button1}
            onClick={() => {
              if(!confirm("취소하시겠습니까?")) return;
              setShow(false);
            }}
          />
          <input 
            type="button"
            value="저장하기"
            className={styles.button}
            onClick={close}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;