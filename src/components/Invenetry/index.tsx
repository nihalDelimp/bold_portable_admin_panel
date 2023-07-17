import React, { useState, useEffect } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../../Common/IsLoggedInHOC";
import Pagination from "../../Common/Pagination";
import { CapitalizeFirstLetter, getFormatedDate, replaceHyphenCapitolize } from "../../Helper";
import CreateInventory from "./Create";
import EditInventory from "./Edit";
import DeleteConfirmationModal from "../../Common/DeleteConfirmation";
import { limitDesc } from "../../Helper/constants";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function InventoryList(props: MyComponentProps) {
  const { setLoading } = props;
  const [listData, setListData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [serviceItem, setServiceItem] = useState(null);
  const [serviceID, setServiceID] = useState<string>("");
  const [statusName, setStatusName] = useState("");
  const [statusLabel, setStatusLabel] = useState("Status");

  useEffect(() => {
    getInventoryListData();
  }, [currentPage, itemsPerPage]);

  const getInventoryListData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/inventory/show?page=${currentPage}&limit=${itemsPerPage}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setListData(resData);
            // setTotalCount(resData?.totalCount);
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

  const handleCreateModal = () => {
    setAddModal(true);
  };

  const handleEditModal = (data: any) => {
    setServiceItem(data);
    setEditModal(true);
  };

  const handleDeleteModal = (_id: string) => {
    setServiceID(_id);
    setDeleteModal(true);
  };

  const handleDeleteItem = async () => {
    setLoading(true);
    await authAxios()
      .delete(`/service/delete/${serviceID}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data?.message);
            setDeleteModal(false);
            getInventoryListData();
          } else {
            toast.error(response.data?.message);
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
                    <h3 className="nk-block-title page-title">
                      Inventory List
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
                                      <span>All</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus("pending", "Pending")
                                      }
                                    >
                                      <span>Pending</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus(
                                          "active",
                                          "Active"
                                        )
                                      }
                                    >
                                      <span>Active</span>
                                    </a>
                                  </li>



                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus(
                                          "modified",
                                          "Modified"
                                        )
                                      }
                                    >
                                      <span>Modified</span>
                                    </a>
                                  </li>

                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus(
                                          "completed",
                                          "Completed"
                                        )
                                      }
                                    >
                                      <span>Completed</span>
                                    </a>
                                  </li>

                                  <li>
                                    <a
                                      onClick={() =>
                                        handleChangeStatus(
                                          "cancelled",
                                          "Cancelled"
                                        )
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
                            <a
                              data-target="addProduct"
                              className="toggle btn btn-icon btn-primary d-md-none"
                            >
                              <em className="icon ni ni-plus"></em>
                            </a>
                            <a
                              onClick={handleCreateModal}
                              data-target="addProduct"
                              className="toggle btn btn-primary d-none d-md-inline-flex"
                            >
                              <em className="icon ni ni-plus"></em>
                              <span>Create</span>
                            </a>
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
                    {/* <div className="nk-tb-col nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="uid"
                        />
                        <label className="custom-control-label"></label>
                      </div>
                    </div> */}
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
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Action</span>
                    </div>
                  </div>
                  {listData &&
                    listData.length > 0 &&
                    listData.map((item: any, index) => (
                      <div key={index + 1} className="nk-tb-item">
                        {/* <div className="nk-tb-col nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="uid1"
                            />
                            <label className="custom-control-label"></label>
                          </div>
                        </div> */}
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
                                    {/* <li>
                                      <a onClick={() => handleEditModal(item)}>
                                        <em className="icon ni ni-edit"></em>
                                        <span>Edit Service</span>
                                      </a>
                                    </li> */}
                                    <li>
                                      <a
                                        className="cursor_ponter"
                                        onClick={() =>
                                          handleDeleteModal(item._id)
                                        }
                                      >
                                        <em className="icon ni ni-trash"></em>
                                        <span>Remove</span>
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
      {addModal && (
        <CreateInventory
          modal={addModal}
          getListingData={getInventoryListData}
          closeModal={(isModal: boolean) => setAddModal(isModal)}
        />
      )}
      {editModal && (
        <EditInventory
          itemData={serviceItem}
          modal={editModal}
          getListingData={getInventoryListData}
          closeModal={(isModal: boolean) => setEditModal(isModal)}
        />
      )}
      {deleteModal && (
        <DeleteConfirmationModal
          modal={deleteModal}
          closeModal={(isModal: boolean) => setDeleteModal(isModal)}
          confirmedDelete={handleDeleteItem}
          actionType="service"
        />
      )}
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(InventoryList));
