import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer";
import { CapitalizeFirstLetter } from "../../Helper";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import IsLoggedinHOC from "../../Common/IsLoggedInHOC";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const InventoryDetails = (props: MyComponentProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { inventory } = useSelector((state: RootState) => state.app);
  const { setLoading } = props;

  console.log("InventoryData", inventory);

  useEffect(() => {
   // getQuotationDetailsData();
  }, []);

  const [coordinator, setCoordinator] = useState({
    name: "",
    email: "",
    cellNumber: "",
  });
  const [quotation, setQuotation] = useState({
    maxWorkers: "",
    weeklyHours: "",
    serviceFrequency: "",
    special_requirements: "",
    distanceFromKelowna: "",
    numUnits: 0,
    workerTypes: "",
    useAtNight: false,
    useInWinter: false,
    designatedWorkers: false,
    handwashing: false,
    handSanitizerPump: false,
    twiceWeeklyService: false,
    dateTillUse: "",
    placementDate: "",
    status: "",
    maleWorkers: 0,
    femaleWorkers: 0,
    totalWorkers: 0,
  });

  const userFields = ["name", "email", "cellNumber"];

  const QuotationFields = [
    "maxWorkers",
    "serviceFrequency",
    "special_requirements",
    "distanceFromKelowna",
    "useAtNight",
    "useInWinter",
    "numUnits",
    "designatedWorkers",
    "workerTypes",
    "handwashing",
    "handSanitizerPump",
    "twiceWeeklyService",
    "placementDate",
    "dateTillUse",
    "status",
    "weeklyHours",
    "maleWorkers",
    "femaleWorkers",
    "totalWorkers",
  ];

  const getQuotationDetailsData = async () => {
    setLoading(true);
    const payload = { quote_id: "quotationId" };
    await authAxios()
      .post("/quotation/get-specific-quotation-from-all-collection", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resCoordinateData = response.data.data.quotation?.coordinator;
            const resData = response.data.data.quotation;
            const costDetails = response.data.data.quotation?.costDetails;
            userFields.forEach((field) => {
              setCoordinator((prev) => ({
                ...prev,
                [field]: resCoordinateData[field],
              }));
            });

            QuotationFields.forEach((field) => {
              setQuotation((prev) => ({
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
                            <h4 className="nk-block-title">Inventory Detail</h4>
                            <div className="nk-block-des"></div>
                          </div>
                          <div className="d-flex align-center">
                            <div className="nk-tab-actions me-n1"></div>
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
                              <span className="data-label">Product Name</span>
                              <span className="data-value">
                                {inventory?.productName}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Category</span>
                              <span className="data-value">
                                {inventory?.category}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Gender</span>
                              <span className="data-value">
                                {" "}
                                {inventory?.gender}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Status</span>
                              <span className="data-value text-soft">
                                {inventory?.status}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Inventory Type</span>
                              <span className="data-value text-soft">
                                {inventory?.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="nk-data data-list">
                          <div className="data-head">
                            <h6 className="overline-title">Quotation</h6>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Quotation Type</span>
                              <span className="data-value">
                                {inventory?.productName}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">distance From Kelowna</span>
                              <span className="data-value">
                                {inventory?.category}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">placementDate</span>
                              <span className="data-value">
                                {" "}
                                10/10/2023
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Status</span>
                              <span className="data-value text-soft">
                                {inventory?.status}
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
    </>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(InventoryDetails));
