import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import {
  CapitalizeFirstLetter,
  getFormatedDate,
  replaceHyphenCapitolize,
} from "../Helper";
import { limitDesc } from "../Helper/constants";
import ConfirmAssignModal from "../Common/ConfirmAssignModal";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function InventoryList(props: MyComponentProps) {
  const { setLoading } = props;
  const [listData, setListData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [statusName, setStatusName] = useState("pending");
  const [gender, setGender] = useState<string>("male");
  const [quoteType, setQuoteType] = useState<string>("standard");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [quotationId, setQuotationId] = useState<string>("");
  const [quotationType, setQuotationType] = useState<string>("");
  const [assignModal, setAssignModal] = useState<boolean>(false);

  useEffect(() => {
    getInventoryListData();
  }, [currentPage, itemsPerPage, statusName]);

  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const quotation_Id = params.get("quoteId");
    const quotation_Type = params.get("quoteType");
    if (quotation_Id) {
      setQuotationId(quotation_Id.toString());
    }
    if (quotation_Type) {
      setQuotationType(quotation_Type?.toLowerCase().toString());
    }
  }, []);

  const getInventoryListData = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/inventory/get-qr-code-details-status?status=${statusName}&page=${currentPage}&limit=${itemsPerPage}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setListData(resData.qrCodes);
            setTotalCount(resData?.totalCount);
          } else {
            toast.error(response.data.message);
            setListData([]);
            setTotalCount(0);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          setListData([]);
          setTotalCount(0);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleAssignQRCode = async () => {
    const payload = {
      _ids: [...selectedItems],
      quoteId: quotationId,
      quoteType: quotationType,
    };
    setLoading(true);
    await authAxios()
      .post(`/inventory/assign-qrcode-to-quote`, payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data;
            toast.success(response.data.message);
            setSelectedItems([]);
            setAssignModal(false);
          } else {
            toast.error(response.data.message);
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

  const handleSelectItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    order_id: string
  ) => {
    const is_checked = e.target.checked;
    const selected_item: any[] = [...selectedItems];
    if (is_checked) {
      selected_item.push(order_id);
      setSelectedItems(selected_item);
    } else {
      const index = selected_item.indexOf(order_id);
      if (index > -1) {
        selected_item.splice(index, 1);
        setSelectedItems(selected_item);
      }
    }
  };

  const handleAssignModal = () => {
    if (selectedItems.length === 0) {
      toast.error("Any production not found");
    } else {
      setAssignModal(true);
    }
  };

  const setBackgroundColor = (status: string) => {
    if (status === "pending") {
      return "bg-warning";
    } else if (status === "active") {
      return "bg-success";
    } else if (status === "cancelled") {
      return "bg-danger";
    } else if (status === "completed") {
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
                    <h3 className="nk-block-title page-title">
                      Assign Production to Quotation
                    </h3>
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
                          <li className="nk-block-tools-opt">
                            <a
                              data-target="addProduct"
                              className="toggle btn btn-icon btn-primary d-md-none"
                            >
                              <em className="icon ni ni-plus"></em>
                            </a>
                            <a
                              onClick={handleAssignModal}
                              data-target="addProduct"
                              className="toggle btn btn-primary d-none d-md-inline-flex"
                            >
                              <em className="icon ni ni-plus"></em>
                              <span>Assign</span>
                            </a>
                          </li>

                          <li>
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                data-bs-toggle="dropdown"
                              >
                                {CapitalizeFirstLetter(quoteType)}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a>
                                      <span>Select type</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => setQuoteType("standard")}>
                                      <span>Standard</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        setQuoteType("standard With Sink")
                                      }
                                    >
                                      <span>Standard With Sink</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        setQuoteType("wheel Chair Accessible")
                                      }
                                    >
                                      <span>Wheel Chair Accessible</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        setQuoteType("high rise capable")
                                      }
                                    >
                                      <span>High rise capable</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                data-bs-toggle="dropdown"
                              >
                                {CapitalizeFirstLetter(gender)}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a>
                                      <span>Select Gender</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => setGender("male")}>
                                      <span>Male</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => setGender("female")}>
                                      <span>Female</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => setGender("Both")}>
                                      <span>Both</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                data-bs-toggle="dropdown"
                              >
                                {CapitalizeFirstLetter(statusName)}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a>
                                      <span>Select Status</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => setStatusName("pending")}>
                                      <span>Pending</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => setStatusName("completed")}
                                    >
                                      <span>Completed</span>
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
                      <span className="sub-text">Product Name</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Service Requirement</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Quantity</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Type</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Description</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Created At</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span>Status</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">OR code</span>
                    </div>
                  </div>
                  {listData &&
                    listData.length > 0 &&
                    listData.map((item: any, index) => (
                      <div key={index + 1} className="nk-tb-item">
                        <div className="nk-tb-col nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className=""
                              id="uid1"
                              onChange={(event) =>
                                handleSelectItem(event, item._id)
                              }
                              checked={selectedItems.includes(item._id)}
                            />
                          </div>
                        </div>
                        <div className="nk-tb-col">
                          <span className="tb-status text-primary">
                            {item._id?.slice(-8)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="nk-tb-col">
                          <div className="user-card">
                            <div className="user-info">
                              <span className="tb-lead">
                                {replaceHyphenCapitolize(item?.productName)}
                                <span className="dot dot-success d-md-none ms-1"></span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          {item.category &&
                            item.category.length > 0 &&
                            item.category.map(
                              (element: string, index: number) => (
                                <React.Fragment key={index}>
                                  <span>{element}</span>
                                  <br />
                                </React.Fragment>
                              )
                            )}
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{item.quantity}</span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{item.type}</span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>
                            {` ${
                              item.description
                                ? item.description?.substring(0, limitDesc)
                                : ""
                            } ${
                              item.description &&
                              item.description.length > limitDesc
                                ? "..."
                                : ""
                            }  `}
                          </span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{getFormatedDate(item.createdAt)}</span>
                        </div>
                        <div className="nk-tb-col tb-col-sm">
                          <span className="tb-odr-status">
                            <span
                              className={`badge badge-dot ${setBackgroundColor(
                                item.status
                              )}`}
                            >
                              {CapitalizeFirstLetter(item.status)}
                            </span>
                          </span>
                        </div>
                        <div className="nk-tb-col">
                          <img
                            style={{ width: "40%" }}
                            src={item?.qrCode}
                            alt="QR Code"
                          />
                        </div>
                      </div>
                    ))}
                </div>
                {listData && listData.length > 0 && (
                  <Pagination
                    totalCount={totalCount}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onChangePageLimit={(page: number) => setItemPerPage(page)}
                    resData={listData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmAssignModal
        modal={assignModal}
        closeModal={(isModal: boolean) => setAssignModal(isModal)}
        handleSubmit={handleAssignQRCode}
      />
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(InventoryList));
