"use client";
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/store';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <html>
  <body>
  <Provider store={store}>{children}</Provider>
  </body>

  </html>;
};

export default Layout;
