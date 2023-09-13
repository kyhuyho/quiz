import Sidebar from "../components/sidebar/Sidebar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/AdminPage.scss";

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <>
        <Sidebar collapsed={collapsed} />
      </>
      <div className="w-100">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars size="25px" />
          </span>
        </div>
        <hr />
        <div className="admin-content">
          <PerfectScrollbar>
            <Outlet></Outlet>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
