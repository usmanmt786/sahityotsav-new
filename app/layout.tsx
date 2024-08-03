import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import APPCONFIGS from "@/configs";
import ToastBox from "@/components/common/ToastBox";
import CoreConfigs from "@/models/configs/core_configs_model";
import SetConfigState from "./SetConfigState";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Sahityotsav ${APPCONFIGS.year} - ${APPCONFIGS.typeName}`,
  description: `${APPCONFIGS.typeName} ${APPCONFIGS.type} Sahityotsav`,
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const configs = await CoreConfigs.getCoreConfigs();

  return (
    <html lang="en">
      <body className={font.className}>
        <SetConfigState configs={configs}/>
        {children}
        <ToastBox/>

      </body>

    </html>
  );
}
