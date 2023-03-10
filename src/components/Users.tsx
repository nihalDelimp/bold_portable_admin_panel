import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import moment from "moment";
import IsLoadingHOC from "../Common/IsLoadingHOC";

function Users(prosp : any) {
  const {setLoading} =  prosp
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    getUsersListData();
  }, []);

  const getUsersListData = async () => {
    setLoading(true)
    await authAxios()
      .get("/auth/get-all-users")
      .then(
        (response) => {
          setLoading(false)
          if (response.data.status === 1) {
            setUsers(response.data.data);
          }
        },
        (error) => {
          setLoading(false)
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <div className="nk-content ">
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

                  {users.map((item: any, index) => (
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
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action-hidden">
                            <a
                              href="#"
                              className="btn btn-trigger btn-icon"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Send Email"
                            >
                              <em className="icon ni ni-mail-fill"></em>
                            </a>
                          </li>
                          <li className="nk-tb-action-hidden">
                            <a
                              href="#"
                              className="btn btn-trigger btn-icon"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Suspend"
                            >
                              <em className="icon ni ni-user-cross-fill"></em>
                            </a>
                          </li>
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
                                    <a href="html/ecommerce/customer-details.html">
                                      <em className="icon ni ni-eye"></em>
                                      <span>View Details</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-repeat"></em>
                                      <span>Orders</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-activity-round"></em>
                                      <span>Activities</span>
                                    </a>
                                  </li>
                                  <li className="divider"></li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-shield-star"></em>
                                      <span>Reset Pass</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-na"></em>
                                      <span>Suspend</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-inner">
                    <div className="nk-block-between-md g-3">
                      <div className="g">
                        <ul className="pagination justify-content-center justify-content-md-start">
                          <li className="page-item">
                            <a className="page-link" href="#">
                              <em className="icon ni ni-chevrons-left"></em>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <span className="page-link">
                              <em className="icon ni ni-more-h"></em>
                            </span>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              6
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              7
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              <em className="icon ni ni-chevrons-right"></em>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="g">
                        <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                          <div>Page</div>
                          <div>
                            <select
                              className="form-select js-select2 "
                              data-search="on"
                              data-dropdown="xs center"
                            >
                              <option value="page-1">1</option>
                              <option value="page-2">2</option>
                              <option value="page-4">4</option>
                              <option value="page-5">5</option>
                              <option value="page-6">6</option>
                              <option value="page-7">7</option>
                              <option value="page-8">8</option>
                              <option value="page-9">9</option>
                              <option value="page-10">10</option>
                              <option value="page-11">11</option>
                              <option value="page-12">12</option>
                              <option value="page-13">13</option>
                              <option value="page-14">14</option>
                              <option value="page-15">15</option>
                              <option value="page-16">16</option>
                              <option value="page-17">17</option>
                              <option value="page-18">18</option>
                              <option value="page-19">19</option>
                              <option value="page-20">20</option>
                            </select>
                          </div>
                          <div>OF 102</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IsLoadingHOC( Users);
