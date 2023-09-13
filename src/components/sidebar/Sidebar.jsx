/* eslint-disable react/prop-types */
import { AiFillDashboard } from "react-icons/ai";
import { MdFeaturedPlayList } from "react-icons/md";
import { BiLogoReact } from "react-icons/bi";
import "../../styles/Sidebar.scss";
import sidebarImage from "../../assets/sidebar-image.jpg";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";

const Sidebar = ({ collapsed, toggled, handleToggleSidebar }) => {
  return (
    <div>
      <ProSidebar
        image={sidebarImage}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div>
              <BiLogoReact color="#00bfff" size="50px" />
              Quizz
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<AiFillDashboard />}>
              Dashboard
              <Link to="/admin" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<MdFeaturedPlayList />} title="Features">
              <MenuItem>
                Quản lý users
                <Link to="/admin/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý Bài Quizzes
                <Link to="/admin/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                Quản lý Câu Hỏi
                <Link to="/admin/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
