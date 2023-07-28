import React, { Fragment } from "react";
import TopNavBar from "../../Common/NavBar";
import Footer from "../../Common/Footer";
import NewSidebar from "../../Common/NewSidebar";

export interface LayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <NewSidebar />
      <div className="nk-wrap">
        <TopNavBar />
        {children}
        <Footer />
      </div>
    </Fragment>
  );
};

export default PrivateLayout;
