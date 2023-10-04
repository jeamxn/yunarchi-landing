import type { Metadata } from "next";

import "@/styles/globals-admin.css";

export const metadata: Metadata = {
  title: "Admin Page :: YUN Architects",
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
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;