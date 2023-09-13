import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
