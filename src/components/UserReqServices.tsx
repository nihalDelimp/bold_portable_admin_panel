import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import { getFormatedDate, replaceHyphenCapitolize } from "../Helper";


interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function UserRequestServices(props: MyComponentProps) {
  const { setLoading } = props;
  const [services, setServices] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);

  useEffect(() => {
    getServicesListData();
  }, [currentPage, itemsPerPage]);

  const getServicesListData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/user-service/list?page=${currentPage}&limit=${itemsPerPage}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setServices(resData.userServices);
            if (resData.pagination && resData.pagination.totalDocuments) {
              setTotalCount(resData?.pagination.totalDocuments);
            }
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

  const handleResolveService = async (_id: any) => {
    setLoading(true);
    await authAxios()
      .delete(`/service/resolve/${_id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data?.message);
            getServicesListData();
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
                      User Request Services
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
                      ></div>
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
                      <span className="sub-text">Service Name</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Service Category</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Created At</span>
                    </div>
                    <div className="nk-tb-col tb-col-md">
                      <span className="sub-text">Action</span>
                    </div>
                  </div>
                  {services &&
                    services.length > 0 &&
                    services.map((item: any, index) => (
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
                            {item._id?.slice(-8)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="nk-tb-col">
                          <div className="user-card">
                            <div className="user-info">
                              <span className="tb-lead">
                                {replaceHyphenCapitolize(item?.service)}
                                <span className="dot dot-success d-md-none ms-1"></span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          {item.serviceTypes &&
                            item.serviceTypes.length > 0 &&
                            item.serviceTypes.map(
                              (item: string, index: number) => (
                                <React.Fragment>
                                  <span>{item}</span>
                                  <br />
                                </React.Fragment>
                              )
                            )}
                        </div>
                        <div className="nk-tb-col tb-col-lg">
                          <span>{getFormatedDate(item.createdAt)}</span>
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
                                      <a
                                        onClick={() =>
                                          handleResolveService(item._id)
                                        }
                                      >
                                        <em className="icon ni ni-thumbs-up"></em>
                                        <span>Resolve</span>
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
                {services && services.length > 0 && (
                  <Pagination
                    totalCount={totalCount}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onChangePageLimit={(page: number) => setItemPerPage(page)}
                    resData={services}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(UserRequestServices));
