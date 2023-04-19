import React, { useState, useEffect, useRef } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import { getFormatedDate } from "../Helper";
import io, { Socket } from "socket.io-client";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const Quotations = (props: MyComponentProps) => {
  const { setLoading } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [quotationData, setquotationData] = useState<string[]>([]);
  const [statusName, setStatusName] = useState<string>("All");
  const [quotationStatus, setquotationStatus] = useState<string>("all");

  useEffect(() => {
    getQuotationData();
  }, [currentPage, quotationStatus]);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

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
                    <span>Email</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>Phone</span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span>DeliveredPrice</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>DistanceFromKelowna</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>MaxWorkers</span>
                  </div>

                  <div className="nk-tb-col tb-col-md">
                    <span>serviceFrequency</span>
                  </div>
                  <div className="nk-tb-col tb-col-md">
                    <span>specialRequirements</span>
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
                    </div>
                  ))}
              </div>
              <Pagination
                totalCount={totalCount}
                onPageChange={(page: number) => setCurrentPage(page)}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemPerPage={setItemPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(Quotations));