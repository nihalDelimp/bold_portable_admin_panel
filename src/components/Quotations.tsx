import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import EditQuotation from "./EditQuotation";
import Pagination from "../Common/Pagination";
import { getFormatedDate } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const Quotations = (props: MyComponentProps) => {
  const { setLoading } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [quotationData, setquotationData] = useState<string[]>([]);
  const [quotationId, setQuotationId] = useState<string>("");
  const [quotationType, setQuotationType] = useState<string>("");

  const [editModal, setEditModal] = useState<boolean>(false);
  const [statusName, setStatusName] = useState<string>("All");
  const [quotationStatus, setquotationStatus] = useState<string>("all");

  useEffect(() => {
    getQuotationData();
  }, [currentPage, quotationStatus, itemsPerPage]);

  const getQuotationData = async () => {
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
            setTotalCount(resData?.total);
            setquotationData(resData.quotations);
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

  const handleApproveQuotation = async (_id: string) => {
    setLoading(true);
    await authAxios()
      .put(`quotation/update-quotation/${_id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            getQuotationData();
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          // toast.success('Approved Successfully')
        }
      )
      .catch((error) => {
        setLoading(false);
        console.log("errorrrr", error);
      });
    toast.success("Approved Successfully");
  };

  const handleDeclineQuotation = async (_id: string) => {
    setLoading(true);
    await authAxios()
      .put(`quotation/update-quotation/${_id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            getQuotationData();
          }
        },
        (error) => {
          setLoading(false);
          // toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        setLoading(false);

        console.log("errorrrr", error);
      });
    toast.error("Quotation has Declined Successfully");
  };

  const onChangeStatus = (status: string) => {
    setquotationStatus(status);
    if (!status) {
      console.log("st", status);
      setStatusName("all");
    } else {
      const status_name = status.charAt(0).toUpperCase() + status.slice(1);
      var str = status_name;
      var newStr = str.replace("-", "  ");
      var finalstr = newStr.replace("-", " ");
      setStatusName(finalstr);
    }
  };

  const handleSendInvoice = (quotation_id: string, type: string) => {
    console.log(quotation_id, "PRINCDEEEEEEEEE");
    setQuotationId(quotation_id);
    setQuotationType(type);
    setEditModal(true);
  };

  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Quotations</h3>
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
                                  <a onClick={() => onChangeStatus("all")}>
                                    <span>All</span>
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => onChangeStatus("event")}>
                                    <span>Event</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      onChangeStatus("personal-or-business")
                                    }
                                  >
                                    <span>Business</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      onChangeStatus("farm-orchard-winery")
                                    }
                                  >
                                    <span>Orchad Winery</span>
                                  </a>
                                </li>

                                <li>
                                  <a
                                    onClick={() =>
                                      onChangeStatus("construction")
                                    }
                                  >
                                    <span>Construction</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      onChangeStatus("disaster-relief")
                                    }
                                  >
                                    <span>Disaster</span>
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
                  <div className="nk-tb-col tb-col-md">
                    <span className="d-none d-sm-block">Name</span>
                  </div>
                  <div className="nk-tb-col tb-col-sm">
                    <span>Email Address</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Phone Number</span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span>Delivered Price</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Distance From Kelowna</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Max Workers</span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span>Service Frequency</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Special Requirements</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span className="sub-text">Action</span>
                  </div>
                </div>
                {quotationData &&
                  quotationData.length > 0 &&
                  quotationData.map((item: any, index: number) => (
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
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">{item.coordinator.name}</span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">{item.coordinator.email}</span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">
                          {item.coordinator.cellNumber}
                        </span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">${item.deliveredPrice}</span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">
                          {item.distanceFromKelowna}
                        </span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">{item.maxWorkers}</span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">{item.serviceFrequency}</span>
                      </div>
                      <div className="nk-tb-col tb-col-sm">
                        <span className="tb-sub">
                          {item.special_requirements}
                        </span>
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
                                    <a
                                      onClick={() =>
                                        handleSendInvoice(item._id, item.type)
                                      }
                                    >
                                      <em className="icon ni ni-edit"></em>
                                      <span>Send Invoice</span>
                                    </a>
                                  </li>

                                  {/* <li>
                                    <a
                                      onClick={() =>
                                        handleApproveQuotation(item._id)
                                      }
                                    >
                                      <em className="icon ni ni-thumbs-up"></em>
                                      <span>Approve</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleDeclineQuotation(item._id)
                                      }
                                    >
                                      <em className="icon ni ni-cross-circle"></em>
                                      <span>Decline</span>
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
              {quotationData && quotationData.length > 0 && (
                <Pagination
                  totalCount={totalCount}
                  onPageChange={(page: number) => setCurrentPage(page)}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onChangePageLimit={(page: number) => setItemPerPage(page)}
                  resData={quotationData}
                />
              )}

              {editModal && (
                <EditQuotation
                  quotationId={quotationId}
                  quotationType={quotationType}
                  editProductModal={editModal}
                  getQuotationData={getQuotationData}
                  closeModal={(isModal: boolean) => setEditModal(isModal)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(Quotations));
