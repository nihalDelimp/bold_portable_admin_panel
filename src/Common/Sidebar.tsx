import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="nk-sidebar nk-sidebar-fixed is-light "
      data-content="sidebarMenu"
    >
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <a href="html/index.html" className="logo-link nk-sidebar-logo">
            <img
              className="logo-light logo-img"
              src={require("../images/logo.png")}
              alt="logo"
            />
            <img
              className="logo-dark logo-img"
              src={require("../images/logo-dark.png")}
              alt="logo-dark"
            />
            <img
              className="logo-small logo-img logo-img-small"
              src={require("../images/logo-small.png")}
              alt="logo-small"
            />
          </a>
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
                <Link to="/products" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-package-fill"></em>
                  </span>
                  <span className="nk-menu-text">Products</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="/customers" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-users-fill"></em>
                  </span>
                  <span className="nk-menu-text">Customers</span>
                </Link>
              </li>

              {/* <li className="nk-menu-item">
                <Link to="/supports" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-chat-fill"></em>
                  </span>
                  <span className="nk-menu-text">Supports</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="settings" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-opt-alt-fill"></em>
                  </span>
                  <span className="nk-menu-text">Settings</span>
                </Link>
              </li>
              <li className="nk-menu-item">
                <Link to="/integrations" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-server-fill"></em>
                  </span>
                  <span className="nk-menu-text">Integration</span>
                </Link>
              </li> */}

              {/* <li className="nk-menu-heading">
                                    <h6 className="overline-title text-primary-alt">Return to</h6>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/index.html" className="nk-menu-link">
                                        <span className="nk-menu-icon"><em className="icon ni ni-dashlite-alt"></em></span>
                                        <span className="nk-menu-text">Main Dashboard</span>
                                    </a>
                                </li>
                                <li className="nk-menu-item">
                                    <a href="html/components.html" className="nk-menu-link">
                                        <span className="nk-menu-icon"><em className="icon ni ni-layers-fill"></em></span>
                                        <span className="nk-menu-text">All Components</span>
                                    </a>
                                </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
