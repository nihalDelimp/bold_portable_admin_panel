import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import {
  CapitalizeFirstLetter,
  getFirstChartByFullName,
  getFormatedDate,
  replaceHyphenCapitolize,
} from "../Helper";
import SaveLocation from "./SaveLocation";
import UpdateLocation from "./UpdateLocation";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function SubscriptionList(props: MyComponentProps) {
  const { setLoading } = props;
  const [invoices, setInvoices] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [saveLocationModal, setSaveLocationModal] = useState(false);
  const [updateLocationModal, setUpdateLocationModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState("");
  const [statusName, setStatusName] = useState("");
  const [statusLabel, setStatusLabel] = useState("Status");
  const [trackingID, setTrackingID] = useState("");

  useEffect(() => {
    getSubscriptionListData();
  }, [currentPage, itemsPerPage, statusName]);

  const getSubscriptionListData = async () => {
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
            setInvoices(resData.formattedSubscriptions);
            setTotalCount(resData?.totalSubscription);
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

  const handleSaveLocationModal = (data: string) => {
    setInvoiceData(data);
    setSaveLocationModal(true);
  };

  const handleUpdateLocationModal = (tracking_id: string) => {
    setTrackingID(tracking_id);
    setUpdateLocationModal(true);
  };

  const handleChangeStatus = (name: string, label: string) => {
    setCurrentPage(1);
    setStatusName(name);
    setStatusLabel(label);
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
                    <h3 className="nk-block-title page-title">Subscriptions</h3>
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
                                {statusLabel}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus("", "Status")
                                      }
                                    >
                                      <span>All Invoices</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus("ACTIVE", "Active")
                                      }
                                    >
                                      <span>Active</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus(
                                          "INACTIVE",
                                          "Inactive"
                                        )
                                      }
                                    >
                                      <span>Inactive</span>
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
                      <span className="sub-text">ID</span>
                    </div>
                    <div className="nk-tb-col">
                      <span className="sub-text">Customer</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Phone</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Email</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Quotation Type</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Date</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Status</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Action</span>
                    </div>
                  </div>
                  {invoices &&
                    invoices.length > 0 &&
                    invoices.map((item: any, index) => (
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
                          <span className="tb-status text-primary">
                            {item.subscription?.slice(-8)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="nk-tb-col">
                          <div className="user-card">
                            <div className="user-info">
                              <span className="tb-lead">
                                {item.user &&
                                  item.user.name &&
                                  CapitalizeFirstLetter(item?.user?.name)}
                                <span className="dot dot-success d-md-none ms-1"></span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span>{item?.user.mobile}</span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{item?.user.email}</span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>
                            {replaceHyphenCapitolize(item?.quotationType)}
                          </span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{getFormatedDate(item.createdAt)}</span>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span className="tb-odr-status">
                            <span
                              className={`badge badge-dot ${
                                item.status === "ACTIVE"
                                  ? "bg-success"
                                  : "bg-danger"
                              } `}
                            >
                              {item.status}
                            </span>
                          </span>
                          {/* <span className="tb-status text-success">
                            Complete
                          </span> */}
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
                                    {item.trackingId ? (
                                      <li>
                                        <a
                                          onClick={() =>
                                            handleUpdateLocationModal(
                                              item.trackingId
                                            )
                                          }
                                        >
                                          <em className="icon ni ni-edit"></em>
                                          <span>Update Location</span>
                                        </a>
                                      </li>
                                    ) : (
                                      <li>
                                        <a
                                          onClick={() =>
                                            handleSaveLocationModal(item)
                                          }
                                        >
                                          <em className="icon ni ni-plus-circle"></em>
                                          <span>Save Location</span>
                                        </a>
                                      </li>
                                    )}
                                    {/* <li>
                                      <Link
                                        to={`/subscription-detail/${item._id}`}
                                      >
                                        <em className="icon ni ni-eye"></em>
                                        <span>Subscription Details</span>
                                      </Link>
                                    </li> */}
                                    <li>
                                      <Link to={`/invoice-detail/${item._id}`}>
                                        <em className="icon ni ni-eye"></em>
                                        <span>View Payment</span>
                                      </Link>
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
                {invoices && invoices.length > 0 && (
                  <Pagination
                    totalCount={totalCount}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onChangePageLimit={(page: number) => setItemPerPage(page)}
                    resData={invoices}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {saveLocationModal && (
        <SaveLocation
          invoiceData={invoiceData}
          modal={saveLocationModal}
          getListingData={getSubscriptionListData}
          closeModal={(isModal: boolean) => setSaveLocationModal(isModal)}
        />
      )}

      {updateLocationModal && (
        <UpdateLocation
          trackingID={trackingID}
          modal={updateLocationModal}
          getListingData={getSubscriptionListData}
          closeModal={(isModal: boolean) => setUpdateLocationModal(isModal)}
        />
      )}
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(SubscriptionList));
