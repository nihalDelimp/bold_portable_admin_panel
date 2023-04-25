import React, { useState, useEffect } from "react";
import Pagination from "../Common/Pagination";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { useFetch } from "../CustomHooks/useFetch";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import { Link } from "react-router-dom";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function InvoicesList(props: MyComponentProps) {
  const { setLoading } = props;
  const [
    listData,
    totalCount,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemPerPage,
  ] = useFetch({
    apiEndPoint: "/auth/get-all-users",
    setLoader: setLoading,
  });

  console.log("listData", listData);

  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">InvoicesList</h3>
                  <div className="nk-block-des text-soft">
                    <p>You have total 937 InvoicesList.</p>
                  </div>
                </div>
                <div className="nk-block-head-content">
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="drodown">
                        <a
                          href="#"
                          className="dropdown-toggle btn btn-icon btn-primary"
                          data-bs-toggle="dropdown"
                        >
                          <em className="icon ni ni-plus"></em>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <a href="#">
                                <span>Add New</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span>Import</span>
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
            <div className="nk-block">
              <div className="card card-stretch">
                <div className="card-inner-group">
                  <div className="card-inner">
                    <div className="card-title-group">
                      <div className="card-title">
                        <h5 className="title">All Invoice</h5>
                      </div>
                      <div className="card-tools me-n1">
                        <ul className="btn-toolbar">
                          <li>
                            <a
                              href="#"
                              className="btn btn-icon search-toggle toggle-search"
                              data-target="search"
                            >
                              <em className="icon ni ni-search"></em>
                            </a>
                          </li>
                          <li className="btn-toolbar-sep"></li>
                          <li>
                            <div className="dropdown">
                              <a
                                href="#"
                                className="btn btn-trigger btn-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                <em className="icon ni ni-setting"></em>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                                <ul className="link-check">
                                  <li>
                                    <span>Show</span>
                                  </li>
                                  <li className="active">
                                    <a href="#">10</a>
                                  </li>
                                  <li>
                                    <a href="#">20</a>
                                  </li>
                                  <li>
                                    <a href="#">50</a>
                                  </li>
                                </ul>
                                <ul className="link-check">
                                  <li>
                                    <span>Order</span>
                                  </li>
                                  <li className="active">
                                    <a href="#">DESC</a>
                                  </li>
                                  <li>
                                    <a href="#">ASC</a>
                                  </li>
                                </ul>
                                <ul className="link-check">
                                  <li>
                                    <span>Density</span>
                                  </li>
                                  <li className="active">
                                    <a href="#">Regular</a>
                                  </li>
                                  <li>
                                    <a href="#">Compact</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="card-search search-wrap"
                        data-search="search"
                      >
                        <div className="search-content">
                          <a
                            href="#"
                            className="search-back btn btn-icon toggle-search"
                            data-target="search"
                          >
                            <em className="icon ni ni-arrow-left"></em>
                          </a>
                          <input
                            type="text"
                            className="form-control form-control-sm border-transparent form-focus-none"
                            placeholder="Quick search by order id"
                          />
                          <button className="search-submit btn btn-icon">
                            <em className="icon ni ni-search"></em>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner p-0">
                    <table className="table table-orders">
                      <thead className="tb-odr-head">
                        <tr className="tb-odr-item">
                          <th className="tb-odr-info">
                            <span className="tb-odr-id">Order ID</span>
                            <span className="tb-odr-date d-none d-md-inline-block">
                              Date
                            </span>
                          </th>
                          <th className="tb-odr-amount">
                            <span className="tb-odr-total">Amount</span>
                            <span className="tb-odr-status d-none d-md-inline-block">
                              Status
                            </span>
                          </th>
                          <th className="tb-odr-action">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody className="tb-odr-body">
                        <tr className="tb-odr-item">
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">
                              <a href="html/invoice-details.html">#746F5K2</a>
                            </span>
                            <span className="tb-odr-date">
                              23 Jan 2019, 10:45pm
                            </span>
                          </td>
                          <td className="tb-odr-amount">
                            <span className="tb-odr-total">
                              <span className="amount">$2300.00</span>
                            </span>
                            <span className="tb-odr-status">
                              <span className="badge badge-dot bg-success">
                                Complete
                              </span>
                            </span>
                          </td>
                          <td className="tb-odr-action">
                            <div className="tb-odr-btns d-none d-sm-inline">
                              <Link
                                to={`/invoice-detail/123456`}
                                className="btn btn-dim btn-sm btn-primary"
                              >
                                View
                              </Link>
                            </div>
                            <a
                              href="html/invoice-details.html"
                              className="btn btn-pd-auto d-sm-none"
                            >
                              <em className="icon ni ni-chevron-right"></em>
                            </a>
                          </td>
                        </tr>
                        <tr className="tb-odr-item">
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">
                              <a href="html/invoice-details.html">#546H74W</a>
                            </span>
                            <span className="tb-odr-date">
                              12 Jan 2020, 10:45pm
                            </span>
                          </td>
                          <td className="tb-odr-amount">
                            <span className="tb-odr-total">
                              <span className="amount">$120.00</span>
                            </span>
                            <span className="tb-odr-status">
                              <span className="badge badge-dot bg-warning">
                                Pending
                              </span>
                            </span>
                          </td>
                          <td className="tb-odr-action">
                            <div className="tb-odr-btns d-none d-sm-inline">
                              <Link
                                to={`/invoice-detail/123456`}
                                className="btn btn-dim btn-sm btn-primary"
                              >
                                View
                              </Link>
                            </div>
                            <a
                              href="html/invoice-details.html"
                              className="btn btn-pd-auto d-sm-none"
                            >
                              <em className="icon ni ni-chevron-right"></em>
                            </a>
                          </td>
                        </tr>
                        <tr className="tb-odr-item">
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">
                              <a href="html/invoice-details.html">#87X6A44</a>
                            </span>
                            <span className="tb-odr-date">
                              26 Dec 2019, 12:15 pm
                            </span>
                          </td>
                          <td className="tb-odr-amount">
                            <span className="tb-odr-total">
                              <span className="amount">$560.00</span>
                            </span>
                            <span className="tb-odr-status">
                              <span className="badge badge-dot bg-success">
                                Complete
                              </span>
                            </span>
                          </td>
                          <td className="tb-odr-action">
                            <div className="tb-odr-btns d-none d-sm-inline">
                              <Link
                                to={`/invoice-detail/123456`}
                                className="btn btn-dim btn-sm btn-primary"
                              >
                                View
                              </Link>
                            </div>
                            <a
                              href="html/invoice-details.html"
                              className="btn btn-pd-auto d-sm-none"
                            >
                              <em className="icon ni ni-chevron-right"></em>
                            </a>
                          </td>
                        </tr>
                        <tr className="tb-odr-item">
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">
                              <a href="html/invoice-details.html">#986G531</a>
                            </span>
                            <span className="tb-odr-date">
                              21 Jan 2019, 6 :12 am
                            </span>
                          </td>
                          <td className="tb-odr-amount">
                            <span className="tb-odr-total">
                              <span className="amount">$3654.00</span>
                            </span>
                            <span className="tb-odr-status">
                              <span className="badge badge-dot bg-danger">
                                Cancelled
                              </span>
                            </span>
                          </td>
                          <td className="tb-odr-action">
                            <div className="tb-odr-btns d-none d-sm-inline">
                              <a
                                href="html/invoice-details.html"
                                className="btn btn-dim btn-sm btn-primary"
                              >
                                View
                              </a>
                            </div>
                            <a
                              href="html/invoice-details.html"
                              className="btn btn-pd-auto d-sm-none"
                            >
                              <em className="icon ni ni-chevron-right"></em>
                            </a>
                          </td>
                        </tr>
                        <tr className="tb-odr-item">
                          <td className="tb-odr-info">
                            <span className="tb-odr-id">
                              <a href="html/invoice-details.html">#326T4M9</a>
                            </span>
                            <span className="tb-odr-date">
                              21 Jan 2019, 6 :12 am
                            </span>
                          </td>
                          <td className="tb-odr-amount">
                            <span className="tb-odr-total">
                              <span className="amount">$200.00</span>
                            </span>
                            <span className="tb-odr-status">
                              <span className="badge badge-dot bg-success">
                                Complete
                              </span>
                            </span>
                          </td>
                          <td className="tb-odr-action">
                            <div className="tb-odr-btns d-none d-sm-inline">
                              <Link
                                to={`/invoice-detail/123456`}
                                className="btn btn-dim btn-sm btn-primary"
                              >
                                View
                              </Link>
                            </div>
                            <a
                              href="html/invoice-details.html"
                              className="btn btn-pd-auto d-sm-none"
                            >
                              <em className="icon ni ni-chevron-right"></em>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {listData && listData.length > 0 && (
                    <Pagination
                      totalCount={totalCount}
                      onPageChange={(page: number) => setCurrentPage(page)}
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      onChangePageLimit={(page: number) => setItemPerPage(page)}
                      resData = {listData}
                      />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(InvoicesList));
