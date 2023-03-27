import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import moment from "moment";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function Customers(prosp: MyComponentProps) {
  const { setLoading } = prosp;
  const [customers, setCustomers] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [itemsPerPage , setItemPerPage] = useState<number>(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0);

  useEffect(() => {
    getCustomerListData();
  }, []);

  const getCustomerListData = async () => {
    setLoading(true);
    await authAxios()
      .get("/auth/get-all-users")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            setCustomers(response.data.data);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <div className="nk-content">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block-head nk-block-head-sm">
                <div className="nk-block-between">
                  <div className="nk-block-head-content">
                    <h3 className="nk-block-title page-title">Customers</h3>
                  </div>
                  <div className="nk-block-head-content">
                    <div className="toggle-wrap nk-block-tools-toggle">
                      <a
                        href="#"
                        className="btn btn-icon btn-trigger toggle-expand me-n1"
                        data-target="more-options"
                      >
                        <em className="icon ni ni-more-v"></em>
                      </a>
                      <div
                        className="toggle-expand-content"
                        data-content="more-options"
                      >
                        <ul className="nk-block-tools g-3">
                          <li>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-right">
                                <em className="icon ni ni-search"></em>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                id="default-04"
                                placeholder="Search by name"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                data-bs-toggle="dropdown"
                              >
                                Status
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a href="#">
                                      <span>Actived</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Inactived</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Blocked</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="nk-block-tools-opt">
                            <button
                              type="button"
                              className="btn btn-icon btn-primary d-md-none"
                            >
                              <em className="icon ni ni-plus"></em>
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary d-none d-md-inline-flex"
                            >
                              <em className="icon ni ni-plus"></em>
                              <span>Add</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="nk-tb-list is-separate mb-3">
                  <div className="nk-tb-item nk-tb-head">
                    <div className="nk-tb-col nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="uid"
                        />
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                    <div className="nk-tb-col">
                      <span className="sub-text">User Name</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Phone</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Email</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Status</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Action</span>
                    </div>
                  </div>

                  {customers.map((item: any, index) => (
                    <div key={index + 1} className="nk-tb-item">
                      <div className="nk-tb-col nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="uid1"
                          />
                          <label className="custom-control-label"></label>
                        </div>
                      </div>
                      <div className="nk-tb-col">
                        <a href="html/ecommerce/customer-details.html">
                          <div className="user-card">
                            <div className="user-avatar bg-primary">
                              <span>AB</span>
                            </div>
                            <div className="user-info">
                              <span className="tb-lead">
                                {item?.name}{" "}
                                <span className="dot dot-success d-md-none ms-1"></span>
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>

                      <div className="nk-tb-col tb-col-md">
                        <span>{item.mobile}</span>
                      </div>
                      <div className="nk-tb-col tb-col-lg">
                        <span>{item.email}</span>
                      </div>
                      <div className="nk-tb-col tb-col-md">
                        <span className="tb-status text-success">Active</span>
                      </div>
                      <div className="nk-tb-col nk-tb-col-tools">
                        <ul className="gx-1">
                          <li>
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle btn btn-icon btn-trigger"
                                data-bs-toggle="dropdown"
                              >
                                <em className="icon ni ni-more-h"></em>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <Link to={`/view-user/${item._id}`}>
                                      <em className="icon ni ni-eye"></em>
                                      <span>View Details</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/orders">
                                      <em className="icon ni ni-repeat"></em>
                                      <span>Orders</span>
                                    </Link>
                                  </li>
                                  {/* <li>
                                    <a href="#">
                                      <em className="icon ni ni-activity-round"></em>
                                      <span>Activities</span>
                                    </a>
                                  </li> */}
                                  {/* <li className="divider"></li> */}
                                  {/* <li>
                                    <a href="#">
                                      <em className="icon ni ni-shield-star"></em>
                                      <span>Reset Pass</span>
                                    </a>
                                  </li> */}
                                  {/* <li>
                                    <a href="#">
                                      <em className="icon ni ni-na"></em>
                                      <span>Suspend</span>
                                    </a>
                                  </li> */}
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                {customers && customers.length > 0 &&
                 <Pagination
                 totalCount={totalCount}
                 currentPage={currentPage}
                 itemsPerPage={itemsPerPage}
                 setItemPerPage = {setItemPerPage}
                 maxPageNumberLimit={maxPageNumberLimit}
                 minPageNumberLimit={minPageNumberLimit}
                 setcurrentPage={setcurrentPage}
                 setmaxPageNumberLimit={setmaxPageNumberLimit}
                 setminPageNumberLimit={setminPageNumberLimit}
                  />
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(Customers));
