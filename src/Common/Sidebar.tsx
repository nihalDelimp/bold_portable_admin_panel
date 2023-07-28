import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  // const pathName = location.pathname;

  const handleSidebarClose=()=>{
    document.getElementById('nk-sidebar-main')?.classList.remove('nk-sidebar-main-active');
  }
  useEffect(() => {
    handleMenumain();
  }, []);
  
  const handleMenumain = () => {
    var mainMenu = document.getElementById('nav-menu-main');

  
    if (mainMenu) {
      var listMainMenu = mainMenu.children;
      
  
      const handleMenuItemClick = (clickedItem: HTMLElement) => {
        const currentPathname = window.location.pathname;
        for (let i = 0; i < listMainMenu.length; i++) {
          if (listMainMenu[i] === clickedItem) {
            listMainMenu[i].classList.add('nk-menu-item-active');
            const subMenu = listMainMenu[i].children[1];
            if (subMenu) {
              subMenu.classList.add('sub-menu-active');
            }
          } else {
            listMainMenu[i].classList.remove('nk-menu-item-active');
            const subMenu = listMainMenu[i].children[1];
            if (subMenu) {
              subMenu.classList.remove('sub-menu-active');
            }
          }
        }
      };
  
      for (let i = 0; i < listMainMenu.length; i++) {
        const menuItem = listMainMenu[i] as HTMLElement;
        const href = menuItem.getAttribute('href');
        if (href && href === window.location.pathname) {
          menuItem.classList.add('nk-menu-item-active');
        }
  
        menuItem.addEventListener('click', () => {
          handleMenuItemClick(menuItem);
        });
      }

      


      
    } else {
      console.log("Not found");
    }
  };
  
 
  

  return (
    <div
      className="nk-sidebar nk-sidebar-fixed is-light"
      data-content="sidebarMenu"
      id="nk-sidebar-main"
    >
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <Link to="/" className="logo-link nk-sidebar-logo">
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
              src={require("../images/favicon.png")}
              alt="logo-small"
            />
          </Link>
        </div>
        <div className="nk-menu-trigger me-n2" id="toggle--button">
          <a
            className="nk-quick-nav-icon d-xl-none"
            data-target="sidebarMenu"
            onClick={()=>handleSidebarClose()}
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
            <ul className="nk-menu" id="nav-menu-main">
              <li
                className={`nk-menu-item`}
              >
                <Link to="/" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-dashboard-fill"></em>
                  </span>
                  <span className="nk-menu-text">Dashboard</span>
                </Link>
              </li>

              <li className="nk-menu-item">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-card-view"></em>
                  </span>
                  <span className="nk-menu-text">Inventory</span>
                </a>
                <ul className="nk-menu-sub">
                  <li
                    className={`nk-menu-item`}
                  >
                    <Link to="/inventory" className="nk-menu-link">
                      <span className="nk-menu-text">Inventory Management</span>
                    </Link>
                  </li>
                  <li
                    className={`nk-menu-item`}
                  >
                    <Link to="/category-management" className="nk-menu-link">
                      <span className="nk-menu-text">Category Management</span>
                    </Link>
                  </li>
                  <li
                    className={`nk-menu-item`}
                  >
                    <Link
                      to="/inventory-type-management"
                      className="nk-menu-link"
                    >
                      <span className="nk-menu-text">Types Management</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nk-menu-item">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-menu-squared"></em>
                  </span>
                  <span className="nk-menu-text">Service</span>
                </a>
                <ul className="nk-menu-sub">
                  <li
                    className={`nk-menu-item`}
                  >
                    <Link to="/service-list" className="nk-menu-link">
                      <span className="nk-menu-text">Service Management</span>
                    </Link>
                  </li>
                  <li
                    className={`nk-menu-item`}
                  >
                    <Link to="/service-requests" className="nk-menu-link">
                      <span className="nk-menu-text">Service Requests</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`nk-menu-item`}
              >
                <Link to="/customers" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-users-fill"></em>
                  </span>
                  <span className="nk-menu-text">Customers</span>
                </Link>
              </li>
              <li
                className={`nk-menu-item`}
              >
                <Link to="/subscriptions" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-file-docs"></em>
                  </span>
                  <span className="nk-menu-text">Contracts</span>
                </Link>
              </li>
              <li
                className={`nk-menu-item`}
              >
                <Link to="/quotations" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-calendar-check-fill"></em>
                  </span>
                  <span className="nk-menu-text">Quotations</span>
                </Link>
              </li>
              <li
                className={`nk-menu-item`}
              >
                <Link to="/send-email" className="nk-menu-link">
                  <span className="nk-menu-icon">
                    <em className="icon ni ni-mail-fill"></em>
                  </span>
                  <span className="nk-menu-text">Send Email</span>
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
