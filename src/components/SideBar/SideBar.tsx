import './SideBar.css';
import { Nav, Image, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SideBarData } from "../../data/SideBarLinkData";
import { useLayoutEffect, useState, useCallback } from "react";
import SidebarUserImage from '../SidebarUserImages/SidebarUserImage';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
import ConfirmationPopUp from '../ConfirmationPopUp/ConfirmationPopUp';

const SideBar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const updateSidebarState = useCallback(() => {
    if (window.innerWidth <= 992) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, []);

  useLayoutEffect(() => {
    updateSidebarState();
    window.addEventListener("resize", updateSidebarState);
    return () => {
      window.removeEventListener("resize", updateSidebarState);
    };
  }, [updateSidebarState]);

  const logout = () => {
    axios.post("https://web-production-3ca4c.up.railway.app/api/logout", {}, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch(() => { });
  };

  return (
    <>
      <div className={`sideBarContainer d-flex flex-column align-items-center position-fixed top-0 left-0 h-100 bg-softBeige ${isCollapsed ? 'collapsed' : ''}`}>

        <div className="w-100 d-flex flex-column align-items-center mb-4">
          <Button
            variant="link"
            className="toggleButton d-lg-none text-black mb-3 p-0"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FaBars size={20} />
          </Button>

          <Link to="/home">
            <Image
              src={
                isCollapsed
                  ? "/task5/images/Home/sidebar/miniLogo.png"
                  : "/task5/images/Home/sidebar/logo.png"
              }
              alt="Logo"
              className="sideBarLogo w-100 "
            />
          </Link>
        </div>

        <SidebarUserImage showName={!isCollapsed} isCollapsed={isCollapsed} />

        <div className="d-flex flex-column align-items-center justify-content-between h-100 w-100">
          <Nav className="flex-column align-items-center sideBarLink">
            {SideBarData.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 fw-medium 
                  ${isActive ? "active bg-orange rounded-1 align-items-center justify-content-center" : ""}`
                }
              >
                <img src={item.src} alt={item.alt} width={24} height={24} />
                {!isCollapsed && <span className="fs-6 text-black">{item.name}</span>}
              </NavLink>
            ))}
          </Nav>

          <Button
            onClick={() => setShowLogoutConfirm(true)}
            className={`d-flex align-items-center gap-2 fw-medium cursor-pointer bg-transparent border-0 text-black fs-17 logoutButton ${isCollapsed ? 'collapsed-link' : ''}`}
          >
            {!isCollapsed && "Logout"}
            <img src="task5/images/Home/sidebar/logoutIcon.svg" alt="Logout" className="logoutIcon" />
          </Button>
        </div>
      </div>

      <ConfirmationPopUp
        title="Are you sure you want to logout?"
        show={showLogoutConfirm}
        onConfirm={logout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
};

export default SideBar;
