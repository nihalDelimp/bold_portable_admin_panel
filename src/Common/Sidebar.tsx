import React from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const PageRefresh = () => {
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
            href="#4"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            data-target="sidebarMenu"
          >
            <em className="icon ni ni-arrow-left"></em>
          </a>
          <a
            href="#4"
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
              <li className="nk-menu-item">
                <Link to="/" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-dashboard-fill"></em>
                  </span>
                  <span className="nk-menu-text">Dashboard</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="/orders" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-bag-fill"></em>
                  </span>
                  <span className="nk-menu-text">Orders</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <a href="#" onClick={PageRefresh} className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-package-fill"></em>
                  </span>
                  <span className="nk-menu-text">Products</span>
                </a>
              </li>
              <li className="nk-menu-item">
                <Link to="/customers" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-users-fill"></em>
                  </span>
                  <span className="nk-menu-text">Customers</span>
                </Link>
              </li>

              <li className="nk-menu-item has-sub">
                <Link to="/invoices" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-file-docs"></em>
                  </span>
                  <span className="nk-menu-text">Invoices</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
