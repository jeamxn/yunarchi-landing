"use client";

import React from "react";
import KakaoLogin from "react-kakao-login";

import { Main } from "@/components";
import styles from "@/styles/admin/Main.module.css";
import { setCookie } from "@/utils/cookie";

import Important from "./Important";

const Page = () => {
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kakaoOnSuccess = async (data: any) => {
    console.log(data);
    setToken(data.response.access_token);
    setCookie("access_token", data.response.access_token, 1);
  };
  const kakaoOnFailure = () => {
    setToken("");
    alert("로그인에 실패했습니다.");
  };

  return (
    <Main className={styles.main} isAdmin>
      <div className={styles.title}>관리자 페이지</div>
      {
        token ? (
          <Important token={token} />
        ) : (
          <KakaoLogin
            token={process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API_KEY as string}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
          />
        )
      }
    </Main>
  );
};

export default Page;