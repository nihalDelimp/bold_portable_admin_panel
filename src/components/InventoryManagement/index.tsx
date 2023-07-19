import React, { useState, useEffect } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import IsLoggedinHOC from "../../Common/IsLoggedInHOC";
import Pagination from "../../Common/Pagination";
import {
  CapitalizeFirstLetter,
  getFormatedDate,
  replaceHyphenCapitolize,
} from "../../Helper";
import CreateFormModal from "./Create";
import EditFormModal from "./Edit";
import DeleteConfirmationModal from "../../Common/DeleteConfirmation";

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
  const [elementData, setElementData] = useState(null);
  const [elementID, setElementID] = useState<string>("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    getInventoryListData();
  }, [currentPage, itemsPerPage, status]);

  const getInventoryListData = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/inventory/get-qr-code-details-status?status=${status}&page=${currentPage}&limit=${itemsPerPage}`
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

  const handleCreateModal = () => {
    setAddModal(true);
  };

  const handleEditModal = (data: any) => {
    setElementData(data);
    setEditModal(true);
  };

  const handleDeleteModal = (_id: string) => {
    setElementID(_id);
    setDeleteModal(true);
  };

  const handleDeleteItem = async () => {
    setLoading(true);
    await authAxios()
      .delete(`/inventory/delete-inventory-details/${elementID}`)
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
      return "bg-success";
    } else if (status === "active") {
      return "bg-warning";
    } else if (status === "cancelled") {
      return "bg-danger";
    } else if (status === "completed") {
      return "bg-success";
    } else {
      return "bg-primary";
    }
  };

  const changeStatus = (name: string) => {
    setCurrentPage(1);
    setStatus(name);
  };

  const getStatusName = (status: string) => {
    if (status === "pending") {
      return "Available";
    } else if (status === "active") {
      return "Assigned";
    } else if (status === "comppleted") {
      return "Completed";
    } else {
      return status;
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
                      Inventory Management
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
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                data-bs-toggle="dropdown"
                              >
                                {getStatusName(status)}
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a>
                                      <span>Select Status</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => changeStatus("pending")}>
                                      <span>Available</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => changeStatus("active")}>
                                      <span>Assigned</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => changeStatus("completed")}
                                    >
                                      <span>Completed</span>
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
                    <div className="nk-tb-col">
                      <span className="sub-text">ID</span>
                    </div>
                    <div className="nk-tb-col">
                      <span className="sub-text">Product Name</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Category</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Type</span>
                    </div>
                    <div className="nk-tb-col tb-col-lg">
                      <span className="sub-text">Gender</span>
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
                        <div className="nk-tb-col tb-col-lg">
                          <span>{CapitalizeFirstLetter(item?.category)}</span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{CapitalizeFirstLetter(item.type)}</span>
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{CapitalizeFirstLetter(item.gender)}</span>
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
                              {getStatusName(item.status)}
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
                                    <li>
                                      <a onClick={() => handleEditModal(item)}>
                                        <em className="icon ni ni-edit"></em>
                                        <span>Edit</span>
                                      </a>
                                    </li>
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
        <CreateFormModal
          modal={addModal}
          getListingData={getInventoryListData}
          closeModal={(isModal: boolean) => setAddModal(isModal)}
        />
      )}
      {editModal && (
        <EditFormModal
          elementData={elementData}
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
          actionType="production"
        />
      )}
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(InventoryList));
