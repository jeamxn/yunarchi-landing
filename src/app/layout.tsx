import type { Metadata } from "next";

import localFont from "next/font/local";

import "@/styles/globals.css";
import RecoilProvider from "@/components/providers/RecoilProvider";

import Loading from "./loading";

const myFont = localFont({
  src: "./woff2/08SeoulHangangL.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YUN Architects",
  description: "디자인그룹 윤 건축사 사무소",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#464d99",
  openGraph: {
    siteName: "YUN Architects",
    type: "website",
    images: {
      url: "/images/og-image.png",
      width: 1200,
      height: 630,
      alt: "YUN Architects",
    },
  },
};

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="ko" className={myFont.className}>
      <body>
        <RecoilProvider>
          {children}
          <Loading />
        </RecoilProvider>
      </body>
    </html>
  );
};

export default Layout;