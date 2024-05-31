"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/store';
import "../styles/globals.css";
import {useRouter} from "next/router";
interface LayoutProps {
  children: ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: LayoutProps) => {
  return <html>
  <body className={inter.className}>
  <Provider store={store}>{children}</Provider>
  </body>

  </html>;
};

export default Layout;
