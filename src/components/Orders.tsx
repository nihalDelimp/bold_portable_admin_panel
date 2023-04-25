import React, { useState, useEffect, useRef } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import { getFormatedDate } from "../Helper";
import io, { Socket } from "socket.io-client";
import CancelConfirmationModal from "../Common/CancelConfirmation";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const Orders = (props: MyComponentProps) => {
  const { setLoading } = props;
  const [orders, setOrders] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [statusName, setStatusName] = useState<string>("Status");
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [orderID, setOrderID] = useState<string>("");

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    getOrdersListData();
  }, [currentPage, orderStatus , itemsPerPage]);

  const getOrdersListData = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/order/get-all-filtered-orders?page=${currentPage}&limit=${itemsPerPage}&status=${orderStatus}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setTotalCount(resData.totalOrders);
            setOrders(resData?.orders);
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

  const onChangeStatus = (status: string) => {
    setCurrentPage(1);
    setOrderStatus(status);
    if (!status) {
      setStatusName("Status");
    } else {
      const status_name = status.charAt(0).toUpperCase() + status.slice(1);
      setStatusName(status_name);
    }
  };

  const setPurchasedItem = (products: any) => {
    if (products && products.length === 1) {
      return products[0].product.title;
    }

    if (products && products.length > 1) {
      return products.length + " items";
    }
  };

  const cancelOrder = async () => {
    setLoading(true);
    await authAxios()
      .patch(`/order/${orderID}/cancel`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            if (socket.current) {
              const order = response.data.data;
              socket.current.emit("cancel_order", {
                orderId: orderID,
                order: order,
              });
            }
            setCancelModal(false);
            getOrdersListData();
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const orderStatusBgColor = (status: string) => {
    if (status === "pending") {
      return "bg-warning";
    } else if (status === "completed") {
      return "bg-success";
    } else if (status === "cancelled") {
      return "bg-danger";
    } else {
      return "bg-info";
    }
  };

  const handleCancelModal = (_id: string) => {
    setCancelModal(!cancelModal);
    if (_id) {
      setOrderID(_id);
    }
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
                                {statusName}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a onClick={() => onChangeStatus("")}>
                                      <span>All Orders</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => onChangeStatus("pending")}
                                    >
                                      <span>Pending</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        onChangeStatus("completed")
                                      }
                                    >
                                      <span>Delivered</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        onChangeStatus("cancelled")
                                      }
                                    >
                                      <span>Cancelled</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="nk-block-tools-opt">
                            <a className="btn btn-icon btn-primary d-md-none">
                              <em className="icon ni ni-plus"></em>
                            </a>
                            <a className="btn btn-primary d-none d-md-inline-flex">
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
                  {orders &&
                    orders.length > 0 &&
                    orders.map((item: any, index: number) => (
                      <div key={item._id} className="nk-tb-item">
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
                          <span className="tb-sub">
                            {getFormatedDate(item.createdAt)}
                          </span>
                        </div>
                        <div className="nk-tb-col">
                          <span
                            className={`dot bg-warning d-sm-none ${orderStatusBgColor(
                              item.status
                            )}`}
                          ></span>
                          <span
                            className={`badge badge-sm badge-dot has-bg d-none d-sm-inline-flex
                          ${orderStatusBgColor(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="nk-tb-col tb-col-sm">
                          <span className="tb-sub">{item.user.name}</span>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span className="tb-sub text-primary">
                            {setPurchasedItem(item.products)}
                          </span>
                        </div>
                        <div className="nk-tb-col">
                          <span className="tb-lead">$ {item.total_price}</span>
                        </div>
                        <div className="nk-tb-col nk-tb-col-tools">
                          <ul className="gx-1">
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
                                    {item.status === "pending" && (
                                      <li>
                                        <a
                                          onClick={() =>
                                            handleCancelModal(item._id)
                                          }
                                        >
                                          <em className="icon ni ni-trash"></em>
                                          <span>Cancel Order</span>
                                        </a>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
                {orders && orders.length > 0 && (
                  <Pagination
                    totalCount={totalCount}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onChangePageLimit={(page: number) => setItemPerPage(page)}
                    resData={orders}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {cancelModal && (
        <CancelConfirmationModal
          modal={cancelModal}
          closeModal={(isModal: boolean) => setCancelModal(isModal)}
          confirmedCancel={cancelOrder}
        />
      )}
    </>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(Orders));
