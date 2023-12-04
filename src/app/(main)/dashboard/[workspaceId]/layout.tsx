import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: any;
};

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <div className={`flex overflow-hidden h-screen w-screen`}>
      <Sidebar params={params} />
      <div
        className={`dark:border-Neutrals/neutrals-12/70 border-l-[1px] w-full relative overflow-scroll`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
