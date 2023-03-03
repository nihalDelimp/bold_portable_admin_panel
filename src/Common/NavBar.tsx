import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { logout } from "../Redux/Reducers/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout(true));
    navigate("/");
  };

  return (
    <>
      <div className="nk-header nk-header-fixed is-light">
        <div className="container-fluid">
          <div className="nk-header-wrap">
            <div className="nk-menu-trigger d-xl-none ms-n1">
              <a
                href="#"
                className="nk-nav-toggle nk-quick-nav-icon"
                data-target="sidebarMenu"
              >
                <em className="icon ni ni-menu"></em>
              </a>
            </div>
            <div className="nk-header-brand d-xl-none">
              <a href="html/index.html" className="logo-link">
                <img
                  className="logo-light logo-img"
                  src="./images/logo.png"
                  alt="logo"
                />
                <img
                  className="logo-dark logo-img"
                  src="./images/logo-dark.png"
                  alt="logo-dark"
                />
              </a>
            </div>
            <div className="nk-header-search ms-3 ms-xl-0">
              <em className="icon ni ni-search"></em>
              <input
                type="text"
                className="form-control border-transparent form-focus-none"
                placeholder="Search anything"
              />
            </div>
            <div className="nk-header-tools">
              <ul className="nk-quick-nav">
             
                <li className="dropdown notification-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle nk-quick-nav-icon"
                    data-bs-toggle="dropdown"
                  >
                    <div className="icon-status icon-status-info">
                      <em className="icon ni ni-bell"></em>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                    <div className="dropdown-head">
                      <span className="sub-title nk-dropdown-title">
                        Notifications
                      </span>
                      <a href="#">Mark All as Read</a>
                    </div>
                    <div className="dropdown-body">
                      <div className="nk-notification">
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              You have requested to <span>Widthdrawl</span>
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              Your <span>Deposit Order</span> is placed
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              You have requested to <span>Widthdrawl</span>
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              Your <span>Deposit Order</span> is placed
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              You have requested to <span>Widthdrawl</span>
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">
                              Your <span>Deposit Order</span> is placed
                            </div>
                            <div className="nk-notification-time">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-foot center">
                      <a href="#">View All</a>
                    </div>
                  </div>
                </li>
                <li className="dropdown user-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle me-n1"
                    data-bs-toggle="dropdown"
                  >
                    <div className="user-toggle">
                      <div className="user-avatar sm">
                        <em className="icon ni ni-user-alt"></em>
                      </div>
                      <div className="user-info d-none d-xl-block">
                      <div className="user-status user-status-active">Administator</div>
                        <div className="user-name dropdown-indicator">{user?.name}</div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                      <div className="user-card">
                        <div className="user-avatar">
                          <span>AB</span>
                        </div>
                        <div className="user-info">
                          <span className="lead-text">{user?.name}</span>
                          <span className="sub-text">{user?.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <Link to="/admin-profile">
                            <em className="icon ni ni-user-alt"></em>
                            <span>View Profile</span>
                          </Link>
                        </li>

                        {/* <li>
                          <a href="html/user-profile-setting.html">
                            <em className="icon ni ni-setting-alt"></em>
                            <span>Account Setting</span>
                          </a>
                        </li>
                        <li>
                          <a href="html/user-profile-activity.html">
                            <em className="icon ni ni-activity-alt"></em>
                            <span>Login Activity</span>
                          </a>
                        </li> */}

                      </ul>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <a href="#" onClick={handleLogout}>
                            <em className="icon ni ni-signout"></em>
                            <span>Sign out</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
