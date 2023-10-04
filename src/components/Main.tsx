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
    {
      !props.isAdmin && <Header />
    }
    <main
      {...props}
      className={[
        "main", 
        props.className
      ].join(" ")}
    >
      {props.children}
    </main>
  </RecoilRoot>
);

export default Main;