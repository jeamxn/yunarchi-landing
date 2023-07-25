import Head from "next/head";
import React from "react";

const DefaultHead = ({...props}) => (
  <Head {...props}>
    <title>YUN Architects</title>
    <meta name="description" content="디자인그룹 윤 건축사 사무소" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default DefaultHead;