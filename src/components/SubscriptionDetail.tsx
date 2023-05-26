import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link, useParams } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import { getFormatedDate, getDateWithoutTime } from "../Helper";
import UpdateLocation from "./UpdateLocation";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const SubscriptionDetail = (props: MyComponentProps) => {
  const { setLoading } = props;
  const params = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const [modal, setModal] = useState(false);
  const [subscription, setSubScription] = useState(null);
  const [trackingID, settrackingID] = useState("646f4b432914d81e107ee0e8");

  useEffect(() => {
    getSubscriptionDetails();
  }, []);

  const getSubscriptionDetails = async () => {
    setLoading(true);
    await authAxios()
      .get(`/payment/subscription/${params.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setSubScription(resData);
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

  const handleModal = (data: any) => {
    setModal(!modal);
  };

  return (
    <>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="card">
                  <div className="card-aside-wrap">
                    <div className="card-inner card-inner-lg">
                      <div className="nk-block-head">
                        <div className="nk-block-between d-flex justify-content-between">
                          <div className="nk-block-head-content">
                            <h4 className="nk-block-title">
                              Subscription Information
                            </h4>
                          </div>
                          <div className="d-flex align-center">
                            <div className="nk-tab-actions me-n1">
                              <a
                                className="btn btn-icon btn-trigger"
                                data-bs-toggle="modal"
                                onClick={handleModal}
                              >
                                <em className="icon ni ni-edit"></em>
                              </a>
                            </div>
                            <div className="nk-block-head-content align-self-start d-lg-none">
                              <a
                                href="#"
                                className="toggle btn btn-icon btn-trigger"
                                data-target="userAside"
                              >
                                <em className="icon ni ni-menu-alt-r"></em>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="nk-block">
                        <div className="nk-data data-list">
                          <div className="data-head">
                            <h6 className="overline-title">Basics</h6>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Full Name</span>
                              <span className="data-value">test</span>
                            </div>
                          </div>
                         
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Email</span>
                              <span className="data-value">test@delimp.com</span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Phone Number</span>
                              <span className="data-value text-soft">
                                {user?.mobile}
                              </span>
                            </div>
                          </div>
                          <div className="data-item" data-tab-target="#address">
                            <div className="data-col">
                              <span className="data-label">Address</span>
                              <span className="data-value">
                                132 Ashok Nagar, New Delhi
                                <br />
                                Delhi, India
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <UpdateLocation
          modal={modal}
          trackingID={trackingID}
          getListingData={getSubscriptionDetails}
          closeModal={(isModal: boolean) => setModal(isModal)}
        />
      )}
    </>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(SubscriptionDetail));
