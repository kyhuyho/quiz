import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postLogOut } from "../../services/authServices";
import { NavLink, useNavigate } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { doLogOut } from "../../redux/action/userAction";
import "../../styles/Header.scss";
import "../../styles/AnimationLogo.scss";
import { useState } from "react";
import ModalInfor from "../modal/ModalInfor";

const Header = () => {
  const account = useSelector((state) => state.user);
  const [isShowModalInfor, setIsShowModalInfor] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const res = await postLogOut(
      account?.account?.email,
      account?.account?.refresh_token
    );
    if (res && res.EC === 0) {
      dispatch(doLogOut());
      toast.success(res.EM);
      navigate("/signin");
    } else toast.error(res.EM);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand header-logo">
            <span className="animation-logo">
              <FaReact size="30px" color="#5ed3f3" />
            </span>
            <span>QUIZEES</span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/list-quizzes" className="nav-link">
                Quizzes
              </NavLink>
              {account?.isAuthenticated === false && (
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              )}
              {account?.account?.role === "ADMIN" && (
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
          {account?.isAuthenticated ? (
            <div className="header-infor">
              <span
                title={account?.account?.email}
                onClick={() => setIsShowModalInfor(true)}
              >
                Hello, <strong>{account?.account?.email}</strong>
              </span>
              <Button bgc="dark" onClick={() => handleLogOut()}>
                Log Out
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Button to="/signin" bgc="light">
                Sign In
              </Button>
              <Button to="/signup" bgc="dark" noBorder={true}>
                Sign Up
              </Button>
            </div>
          )}
        </Container>
      </Navbar>
      <ModalInfor show={isShowModalInfor} setShow={setIsShowModalInfor} />
    </>
  );
};

export default Header;
