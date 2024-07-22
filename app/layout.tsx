import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import APPCONFIGS from "@/configs";
import ToastBox from "@/components/common/ToastBox";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Sahityotsav ${APPCONFIGS.year} - ${APPCONFIGS.typeName}`,
  description: `${APPCONFIGS.typeName} ${APPCONFIGS.type} Sahityotsav`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}
        <ToastBox/>

      </body>

    </html>
  );
}
