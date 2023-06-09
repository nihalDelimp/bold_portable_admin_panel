import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import { CapitalizeFirstLetter, getStringDate } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function Dashboard(props: MyComponentProps) {
  const { setLoading } = props;
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [totalQuotation, setTotalQuotation] = useState<number>(0);
  const [totalSubscriber, setTotalSubscriber] = useState<number>(0);
  const [quotationData, setquotationData] = useState<string[]>([]);

  const [currentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [quotationStatus] = useState<string>("all");
  const [statusName] = useState("");

  useEffect(() => {
    getCustomerCount();
    getQuotationsCount();
    getSubscriberCount();
  }, []);

  const getCustomerCount = async () => {
    setLoading(true);
    await authAxios()
      .get(`/auth/get-all-users?page=${currentPage}&limit=${itemsPerPage}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setTotalCustomers(resData?.total);
          }
        },
        (error) => {
          setLoading(false);
         // toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const getQuotationsCount = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `quotation/get-quotation-of-user/${quotationStatus}?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setTotalQuotation(resData?.total);
            setquotationData(resData.quotations);
          }
        },
        (error) => {
          setLoading(false);
         // toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const getSubscriberCount = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/payment/admin/subscription?status=${statusName}&page=${currentPage}&limit=${itemsPerPage}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setTotalSubscriber(resData?.totalSubscription);
          }
        },
        (error) => {
          setLoading(false);
        //  toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const setBackgroundColor = (status: string) => {
    if (status === "pending") {
      return "bg-warning";
    } else if (status === "cancelled") {
      return "bg-danger";
    } else if (status === "complete") {
      return "bg-success";
    } else {
      return "bg-primary";
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
                    <h3 className="nk-block-title page-title">Dashboard</h3>
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
                          <li className="nk-block-tools-opt">
                            <Link to = '/quotations' className="btn btn-primary">
                              <em className="icon ni ni-reports"></em>
                              <span>View All Quotation </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="row g-gs">
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card">
                      <div className="nk-ecwg nk-ecwg6">
                        <div className="card-inner">
                          <div className="card-title-group">
                            <div className="card-title">
                              <h6 className="title">Customers</h6>
                            </div>
                          </div>
                          <div className="data">
                            <div className="data-group">
                              <div className="amount">{totalCustomers}</div>
                              <div className="nk-ecwg6-ck">
                                <canvas
                                  className="ecommerce-line-chart-s3"
                                  id="todayOrders"
                                ></canvas>
                              </div>
                            </div>
                            <div className="info">
                              <span className="change up text-danger">
                                <em className="icon ni ni-arrow-long-up"></em>
                                4.63%
                              </span>
                              <span> vs. last week</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card">
                      <div className="nk-ecwg nk-ecwg6">
                        <div className="card-inner">
                          <div className="card-title-group">
                            <div className="card-title">
                              <h6 className="title">Orders</h6>
                            </div>
                          </div>
                          <div className="data">
                            <div className="data-group">
                              <div className="amount">{totalQuotation}</div>
                              <div className="nk-ecwg6-ck">
                                <canvas
                                  className="ecommerce-line-chart-s3"
                                  id="todayCustomers"
                                ></canvas>
                              </div>
                            </div>
                            <div className="info">
                              <span className="change up text-danger">
                                <em className="icon ni ni-arrow-long-up"></em>
                                4.63%
                              </span>
                              <span> vs. last week</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card">
                      <div className="nk-ecwg nk-ecwg6">
                        <div className="card-inner">
                          <div className="card-title-group">
                            <div className="card-title">
                              <h6 className="title">Subscribers</h6>
                            </div>
                          </div>
                          <div className="data">
                            <div className="data-group">
                              <div className="amount">{totalSubscriber}</div>
                              <div className="nk-ecwg6-ck">
                                <canvas
                                  className="ecommerce-line-chart-s3"
                                  id="todayVisitors"
                                ></canvas>
                              </div>
                            </div>
                            <div className="info">
                              <span className="change down text-danger">
                                <em className="icon ni ni-arrow-long-down"></em>
                                2.34%
                              </span>
                              <span> vs. last week</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-8">
                    <div className="card card-full">
                      <div className="card-inner">
                        <div className="card-title-group">
                          <div className="card-title">
                            <h6 className="title">Recent Quotation</h6>
                          </div>
                        </div>
                      </div>
                      <div className="nk-tb-list mt-n2">
                        <div className="nk-tb-item nk-tb-head">
                          <div className="nk-tb-col">
                            <span>Order No.</span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <span>Customer</span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <span>Phone</span>
                          </div>
                          <div className="nk-tb-col tb-col-md"><span></span>
                            <span>Date</span>
                          </div>
                          <div className="nk-tb-col">
                            <span>Distance From Kelowna</span>
                          </div>
                          <div className="nk-tb-col">
                            <span>Type</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="d-none d-sm-inline">Status</span>
                          </div>
                        </div>
                        {quotationData &&
                          quotationData.length > 0 &&
                          quotationData.slice(0, 6).map((item: any) => (
                            <div key={item._id} className="nk-tb-item">
                              <div className="nk-tb-col">
                                <span className="tb-lead">
                                  <a href="#">
                                    <div>{item._id.slice(-6)}</div>
                                  </a>
                                </span>
                              </div>
                              <div className="nk-tb-col tb-col-sm">
                                <div className="user-card">
                                  <div className="user-name">
                                    <span className="tb-lead">
                                      {item.coordinator.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="nk-tb-col tb-col-md">
                                <span className="tb-sub">
                                {item.coordinator.cellNumber}
                                </span>
                              </div>
                              <div className="nk-tb-col tb-col-md">
                                <span className="tb-sub">
                                  {getStringDate(item.createdAt)}
                                </span>
                              </div>
                              <div className="nk-tb-col">
                                <span className="tb-sub tb-amount">
                                {item.distanceFromKelowna} km
                                </span>
                              </div>
                              <div className="nk-tb-col">
                                <span className="tb-sub tb-amount">
                                  {CapitalizeFirstLetter(item.type)}
                                </span>
                              </div>
                              <div className="nk-tb-col">
                                <span
                                  className={`badge badge-dot badge-dot-xs ${setBackgroundColor(
                                    item.status
                                  )} `}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          ))}
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

export default IsLoadingHOC(IsLoggedinHOC(Dashboard));
