import type { Metadata } from "next";
import "../styles/reset.css";
import "../styles/global.css";
import {Flex} from "antd";
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import SideFilters from "@/components/SideFilters/SideFilters";
export const metadata: Metadata = {
  title: "Проект ВТЗ",
};
import Script from 'next/script'
import GoWebAssemblyProvider from "@/utils/GoWebAssemblyProvider";




export default function RootLayout({ children }: React.PropsWithChildren){

  return (
    <html lang="ru">
    <body>
    <Flex className='app'>
      <SideFilters />
      <div className='app_content'>
        <GoWebAssemblyProvider>
        <AntdRegistry>{children}</AntdRegistry>
        </GoWebAssemblyProvider>
      </div>
      </Flex>
    </body>
    </html>
  );
}