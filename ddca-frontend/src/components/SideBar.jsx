import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaPhoneAlt,
  FaDumbbell,
  FaImages,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import Logo from "../media/Logo.png";
import "./Sidebar.css";

const SideBarNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo.user);
  }, []);

  const handleToggle = () => setCollapsed(!collapsed);

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="transparent"
      rootStyles={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(10,0,0,1) 100%)",
        height: "100vh",
        position: "fixed",
        borderRight: "1px solid rgba(255, 0, 0, 0.25)",
        boxShadow: "0 0 25px rgba(255, 0, 0, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Collapse + Logo Section */}
      <div
        className="sidebar-toggle"
        onClick={handleToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: "16px",
          cursor: "pointer",
          borderBottom: "1px solid rgba(255, 0, 0, 0.25)",
        }}
      >
        {collapsed ? (
          <FaChevronRight size={22} color="#ff0000" />
        ) : (
          <FaChevronLeft size={22} color="#ff0000" />
        )}
        <img
          src={Logo}
          alt="Logo"
          style={{
            marginLeft: collapsed ? "0" : "12px",
            width: collapsed ? "40px" : "100px",
            height: "auto",
            borderRadius: "50%",
            boxShadow: "0 0 12px #ff0000",
            transition: "all 0.3s ease",
          }}
        />
      </div>

      {/* Menu Items */}
      <Menu
        menuItemStyles={{
          button: {
            color: "#ffdddd",
            fontSize: "16px",
            fontWeight: "500",
            padding: "12px 20px",
            borderRadius: "8px",
            margin: "4px 8px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(255, 0, 0, 0.1)",
              color: "#ff0000",
              boxShadow: "0 0 8px #ff0000",
            },
            "&.active": {
              background: "rgba(255, 0, 0, 0.15)",
              color: "#ff0000",
              boxShadow: "0 0 10px #ff0000",
            },
          },
        }}
      >
        <MenuItem icon={<FaHome />} component={<Link to="/home" />}>
          Home
        </MenuItem>
        <MenuItem icon={<FaInfoCircle />} component={<Link to="/about" />}>
          About
        </MenuItem>
        <MenuItem icon={<FaServicestack />} component={<Link to="/services" />}>
          Services
        </MenuItem>
        <MenuItem icon={<FaPhoneAlt />} component={<Link to="/contact" />}>
          Contact
        </MenuItem>
        <MenuItem
          icon={<FaDumbbell />}
          component={<Link to="/personal-training" />}
        >
          Personal Training
        </MenuItem>
        <MenuItem icon={<FaImages />} component={<Link to="/images" />}>
          Images
        </MenuItem>
        <MenuItem icon={<FaTrophy />} component={<Link to="/achievements" />}>
          Achievements
        </MenuItem>
        {user ? (
          <MenuItem icon={<FaUser />} component={<Link to="/dashboard" />}>
            <span style={{ color: "#ff0000" }}>{user.name}</span>
          </MenuItem>
        ) : (
          <MenuItem icon={<FaUser />} component={<Link to="/Login" />}>
            <span style={{ color: "#ff5555" }}>Login / Signup</span>
          </MenuItem>
        )}
      </Menu>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          padding: "10px",
          textAlign: "center",
          color: "#ff0000",
          fontSize: "12px",
          borderTop: "px solid rgba(255, 0, 0, 0.2)",
        }}
      >
        {!collapsed && (
          <p className="neon-footer-red">© 2025 DeenDayalCricketAcademy</p>
        )}
      </div>
    </Sidebar>
  );
};

export default SideBarNav;
