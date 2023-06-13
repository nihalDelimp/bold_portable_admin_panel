import React from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const handleNavigate = () => {
    navigate("/products");
    window.location.reload();
  };

  return (
    <div
      className="nk-sidebar nk-sidebar-fixed is-light"
      data-content="sidebarMenu"
    >
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <NavLink to="/" className="logo-link nk-sidebar-logo">
            <img
              className="logo-light logo-img"
              src={require("../images/bold_port.png")}
              alt="logo"
            />
            <img
              className="logo-dark logo-img"
              src={require("../images/bold_port.png")}
              alt="logo-dark"
            />
            <img
              className="logo-small logo-img logo-img-small"
              src={require("../images/bold_port.png")}
              alt="logo-small"
            />
          </NavLink>
        </div>
        <div className="nk-menu-trigger me-n2">
          <a
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-arrow-left"></em>
          </a>
          <a
            className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-menu"></em>
          </a>
        </div>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-content">
          <div className="nk-sidebar-menu" data-simplebar>
            <ul className="nk-menu">
              <li
                className={`nk-menu-item ${pathName === "/" ? "active" : ""}`}
              >
                <NavLink to="/" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-dashboard-fill"></em>
                  </span>
                  <span className="nk-menu-text">Dashboard</span>
                </NavLink>
              </li>
              {/* <li
                className={`nk-menu-item ${
                  pathName === "/orders" ? "active" : ""
                }`}
              >
                <NavLink to="/orders" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-bag-fill"></em>
                  </span>
                  <span className="nk-menu-text">Orders</span>
                </NavLink>
              </li>
              <li
                className={`nk-menu-item ${
                  pathName === "/products" ? "active" : ""
                }`}
              >
                <Link to="/products" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-package-fill"></em>
                  </span>
                  <span className="nk-menu-text">Products</span>
                </Link>
              </li> */}
              <li
                className={`nk-menu-item ${
                  pathName === "/customers" ? "active" : ""
                }`}
              >
                <NavLink to="/customers" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-users-fill"></em>
                  </span>
                  <span className="nk-menu-text">Customers</span>
                </NavLink>
              </li>
              <li
                className={`nk-menu-item ${
                  pathName === "/invoices" ? "active" : ""
                }`}
              >
                <NavLink to="/invoices" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-file-docs"></em>
                  </span>
                  <span className="nk-menu-text">Subscriptions</span>
                </NavLink>
              </li>
              <li
                className={`nk-menu-item ${
                  pathName === "/quotations" ? "active" : ""
                }`}
              >
                <NavLink to="/quotations" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-calendar-check-fill"></em>
                  </span>
                  <span className="nk-menu-text">Quotations</span>
                </NavLink>
              </li>
              <li
                className={`nk-menu-item ${
                  pathName === "/send-email" ? "active" : ""
                }`}
              >
                <NavLink to="/send-email" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-mail-fill"></em>
                  </span>
                  <span className="nk-menu-text">Send Email</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
