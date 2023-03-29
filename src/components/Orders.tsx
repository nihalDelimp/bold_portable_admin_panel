import React , {useState , useEffect}  from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../Config/config";
import {toast} from 'react-toastify' ;
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const  Orders = (props :  MyComponentProps) => {
    const {setLoading} =  props
    const [orders , setOrders] =  useState<string[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [currentPage, setcurrentPage] = useState<number>(1);
    const [itemsPerPage , setItemPerPage] = useState<number>(10);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0);


    useEffect(() => {
        getOrdersListData();
      }, []);
    
      const getOrdersListData = async () => {
        setLoading(true);
        await authAxios()
          .get("/orders/get-orders")
          .then(
            (response) => {
              setLoading(false);
              if (response.data.status === 1) {
                setOrders(response.data.data);
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
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Orders</h3>
                </div>
                <div className="nk-block-head-content">
                  <div className="toggle-wrap nk-block-tools-toggle">
                    <a
                      href="#"
                      className="btn btn-icon btn-trigger toggle-expand me-n1"
                      data-target="pageMenu"
                    >
                      <em className="icon ni ni-more-v"></em>
                    </a>
                    <div
                      className="toggle-expand-content"
                      data-content="pageMenu"
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
                              placeholder="Quick search by id"
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
                                    <span>On Hold</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span>Delevired</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span>Rejected</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li className="nk-block-tools-opt">
                          <a
                            href="#"
                            className="btn btn-icon btn-primary d-md-none"
                          >
                            <em className="icon ni ni-plus"></em>
                          </a>
                          <a
                            href="#"
                            className="btn btn-primary d-none d-md-inline-flex"
                          >
                            <em className="icon ni ni-plus"></em>
                            <span>Add Order</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nk-block">
              <div className="nk-tb-list is-separate is-medium mb-3">
                <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="oid"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="oid"
                      ></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <span>Order</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Date</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="d-none d-sm-block">Status</span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span>Customer</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Purchased</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Total</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Action</span>
                  </div>
                 
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="oid01"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="oid01"
                      ></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">
                      <a href="#">#95954</a>
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub">Jun 4, 2020</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="dot bg-warning d-sm-none"></span>
                    <span className="badge badge-sm badge-dot has-bg bg-warning d-none d-sm-inline-flex">
                      On Hold
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span className="tb-sub">Arnold Armstrong</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub text-primary">3 Items</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">$ 249.75</span>
                  </div>
                  <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="Mark as Delivered"
                        >
                          <em className="icon ni ni-truck"></em>
                        </a>
                      </li>
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="View Order"
                        >
                          <em className="icon ni ni-eye"></em>
                        </a>
                      </li>
                      <li>
                        <div className="drodown me-n1">
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
                                <a href="#">
                                  <em className="icon ni ni-eye"></em>
                                  <span>Order Details</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-truck"></em>
                                  <span>Mark as Delivered</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-money"></em>
                                  <span>Mark as Paid</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-report-profit"></em>
                                  <span>Send Invoice</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-trash"></em>
                                  <span>Remove Order</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="oid02"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="oid02"
                      ></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">
                      <a href="#">#95961</a>
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub">Jun 3, 2020</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="dot bg-success d-sm-none"></span>
                    <span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">
                      Delivered
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span className="tb-sub">Jean Douglas</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub text-primary">
                      Pink Fitness Tracker
                    </span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">$ 99.49</span>
                  </div>
                  <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="Mark as Delivered"
                        >
                          <em className="icon ni ni-truck"></em>
                        </a>
                      </li>
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="View Order"
                        >
                          <em className="icon ni ni-eye"></em>
                        </a>
                      </li>

                      <li>
                        <div className="drodown me-n1">
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
                                <a href="#">
                                  <em className="icon ni ni-eye"></em>
                                  <span>Order Details</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-truck"></em>
                                  <span>Mark as Delivered</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-money"></em>
                                  <span>Mark as Paid</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-report-profit"></em>
                                  <span>Send Invoice</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-trash"></em>
                                  <span>Remove Order</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="oid03"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="oid03"
                      ></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">
                      <a href="#">#95963</a>
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub">May 29, 2020</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="dot bg-success d-sm-none"></span>
                    <span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">
                      Delivered
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span className="tb-sub">Ashley Lawson</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub text-primary">
                      Black Headphones
                    </span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">$ 149.75</span>
                  </div>
                  <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="Mark as Delivered"
                        >
                          <em className="icon ni ni-truck"></em>
                        </a>
                      </li>
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="View Order"
                        >
                          <em className="icon ni ni-eye"></em>
                        </a>
                      </li>

                      <li>
                        <div className="drodown me-n1">
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
                                <a href="#">
                                  <em className="icon ni ni-eye"></em>
                                  <span>Order Details</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-truck"></em>
                                  <span>Mark as Delivered</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-money"></em>
                                  <span>Mark as Paid</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-report-profit"></em>
                                  <span>Send Invoice</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-trash"></em>
                                  <span>Remove Order</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="oid04"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="oid04"
                      ></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">
                      <a href="#">#95933</a>
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub">May 29, 2020</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="dot bg-success d-sm-none"></span>
                    <span className="badge badge-sm badge-dot has-bg bg-success d-none d-sm-inline-flex">
                      Delivered
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span className="tb-sub">Joe Larson</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub text-primary">2 Items</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">$ 199.49</span>
                  </div>
                  <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="Mark as Delivered"
                        >
                          <em className="icon ni ni-truck"></em>
                        </a>
                      </li>
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="View Order"
                        >
                          <em className="icon ni ni-eye"></em>
                        </a>
                      </li>
                      <li>
                        <div className="drodown me-n1">
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
                                <a href="#">
                                  <em className="icon ni ni-eye"></em>
                                  <span>Order Details</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-truck"></em>
                                  <span>Mark as Delivered</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-money"></em>
                                  <span>Mark as Paid</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-report-profit"></em>
                                  <span>Send Invoice</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-trash"></em>
                                  <span>Remove Order</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="nk-tb-item">
                  <div className="nk-tb-col nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="oid05"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="oid05"
                      ></label>
                    </div>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">
                      <a href="#">#95947</a>
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub">May 28, 2020</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="dot bg-warning d-sm-none"></span>
                    <span className="badge badge-sm badge-dot has-bg bg-warning d-none d-sm-inline-flex">
                      On Hold
                    </span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span className="tb-sub">Frances Burns</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="tb-sub text-primary">6 Items</span>
                  </div>
                  <div className="nk-tb-col">
                    <span className="tb-lead">$ 469.75</span>
                  </div>
                  <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="Mark as Delivered"
                        >
                          <em className="icon ni ni-truck"></em>
                        </a>
                      </li>
                      <li className="nk-tb-action-hidden">
                        <a
                          href="#"
                          className="btn btn-icon btn-trigger btn-tooltip"
                          title="View Order"
                        >
                          <em className="icon ni ni-eye"></em>
                        </a>
                      </li>

                      <li>
                        <div className="drodown me-n1">
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
                                <a href="#">
                                  <em className="icon ni ni-eye"></em>
                                  <span>Order Details</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-truck"></em>
                                  <span>Mark as Delivered</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-money"></em>
                                  <span>Mark as Paid</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-report-profit"></em>
                                  <span>Send Invoice</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <em className="icon ni ni-trash"></em>
                                  <span>Remove Order</span>
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
              <Pagination
                 totalCount={totalCount}
                 currentPage={currentPage}
                 itemsPerPage={itemsPerPage}
                 maxPageNumberLimit={maxPageNumberLimit}
                 minPageNumberLimit={minPageNumberLimit}
                 setcurrentPage={setcurrentPage}
                 setItemPerPage = {setItemPerPage}
                 setmaxPageNumberLimit={setmaxPageNumberLimit}
                 setminPageNumberLimit={setminPageNumberLimit}
                  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(Orders))
