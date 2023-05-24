import React from "react";
import Header from "./Header";
import PageFooter from "./Footer";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="min-h-[80vh]">
        <Toaster />
        {children}
      </main>
      <PageFooter />
    </div>
  );
};

export default Layout;
