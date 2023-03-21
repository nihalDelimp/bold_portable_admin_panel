import React, { useState, useEffect } from "react";
// import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import IsLoggedinHOC from "./../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const ViewCustomer = (props: MyComponentProps) => {
  const { setLoading } = props;
  const params = useParams();
  const { user } = useSelector((state: RootState) => state.auth);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    profile_image: "",
  });

  useEffect(() => {
    getCustomerDetailsData();
  }, []);

  const getCustomerDetailsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/auth/get-specific-user/${params.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            const userFields = ["name", "email", "profile_image", "mobile"];
            userFields.forEach((field) => {
              setCustomer((prev) => ({
                ...prev,
                [field]: resData[field],
              }));
            });
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
                            <h4 className="nk-block-title">User Details</h4>
                            <div className="nk-block-des"></div>
                          </div>
                          <div className="d-flex align-center">
                            <div className="nk-tab-actions me-n1"></div>
                            <div className="nk-block-head-content align-self-start d-lg-none">
                              <a
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
                              <span className="data-label">Name</span>
                              <span className="data-value">
                                {customer?.name}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Email</span>
                              <span className="data-value">
                                {customer?.email}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Phone</span>
                              <span className="data-value">
                                {customer?.mobile}
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
      {/* <EditProfile /> */}
    </>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(ViewCustomer));
