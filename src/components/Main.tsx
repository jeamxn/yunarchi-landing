"use client";

import React from "react";
import { RecoilRoot } from "recoil";

import { Header } from "@/components";

const Main = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    isAdmin?: boolean;
  },
) => (
  <RecoilRoot>
    <main
      {...props}
      className={[
        "main", 
        props.className
      ].join(" ")}
    >
      {
        props.isAdmin ? (
          <Header isAdmin={true}/>
        ) : (
          <Header isAdmin={false}/>
        )
      }
      {props.children}
    </main>
  </RecoilRoot>
);

export default Main;