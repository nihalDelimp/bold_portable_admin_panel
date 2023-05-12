import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import moment from "moment";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  quotationId: string;
  quotationType: string;
  editProductModal: boolean;
  closeModal: (isModal: boolean) => void;
  getQuotationData: () => void;
}

function EditQuotation(props: MyComponentProps) {
  const {
    setLoading,
    quotationId,
    quotationType,
    editProductModal,
    closeModal,
    getQuotationData,
  } = props;
  const [activeStep, setActiveStep] = useState<number>(1);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    product_images: [],
    product_price: "",
    product_type: "",
  });

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
    deliveredPrice: "",
    distanceFromKelowna: "",
    numUnits: 0,
    serviceCharge: "",
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
  });

  const [servicesPrice, setServicesPrice] = useState({
    maxWorkers_cost: 0,
    special_requirements_cost: 0,
    distanceFromKelowna_cost: 0,
    numUnits_cost: 0,
    useAtNight_cost: 0,
    useInWinter_cost: 0,
    workersType_cost: 0,
    femaleWorkers_cost: 0,
    handwashing_cost: 0,
    handSanitizerPump_cost: 0,
    twiceWeeklyService_cost: 0,
  });

  useEffect(() => {
    getProductDetailsData();
  }, []);

  const getProductDetailsData = async () => {
    setLoading(true);
    const payload = { quote_id: quotationId };
    await authAxios()
      .post("/quotation/get-specific-quotation-from-all-collection", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resCoordinateData = response.data.data.quotation.coordinator;
            const resData = response.data.data.quotation;
            const userFields = [
              "name",
              "email",
              "cellNumber",
            ];
            userFields.forEach((field) => {
              setCoordinator((prev) => ({
                ...prev,
                [field]: resCoordinateData[field],
              }));
            });

            const QuotationData = [
              "maxWorkers",
              "serviceFrequency",
              "special_requirements",
              "deliveredPrice",
              "distanceFromKelowna",
              "serviceCharge",
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
            ];

            QuotationData.forEach((field) => {
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

  const handleChangeQuotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuotation((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCoordinator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoordinator((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeServicePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServicesPrice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      quotationType: quotationType,
      quotationId: quotationId,
      useAtNightCost: servicesPrice.useAtNight_cost,
      useInWinterCost: servicesPrice.useInWinter_cost,
      numberOfUnitsCost: servicesPrice.numUnits_cost,
      workersCost: servicesPrice.femaleWorkers_cost,
      workersTypeCost: servicesPrice.workersType_cost,
      handWashingCost: servicesPrice.handwashing_cost,
      handSanitizerPumpCost: servicesPrice.handSanitizerPump_cost,
      twiceWeeklyServicingCost: servicesPrice.twiceWeeklyService_cost,
      specialRequirementsCost: servicesPrice.special_requirements_cost,
      deliveryCost: quotation.deliveredPrice,
      distanceFromKelownaCost: servicesPrice.distanceFromKelowna_cost,
      maxWorkersCost: servicesPrice.maxWorkers_cost,
    };
    setLoading(true);
    await authAxios()
      .post(`/cost-management/save-cost-quotation`, payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            closeModal(false);
            getQuotationData();
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          console.log(error);
        }
      )
      .catch((error) => {
        setLoading(false);
        console.log("errorrrr", error);
      });
  };

  return (
    <div
      className={`modal fade ${editProductModal ? "show" : "hide"}`}
      style={{ display: editProductModal ? "block" : "none" }}
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <a
            onClick={() => closeModal(false)}
            className="close cursor_ponter"
            data-bs-dismiss="modal"
          >
            <em className="icon ni ni-cross-sm"></em>
          </a>
          <div className="modal-body modal-body-md">
            <h5 className="title">Edit Quotation</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeStep === 1 ? "active" : ""} `}
                  data-bs-toggle="tab"
                  onClick={() => setActiveStep(1)}
                >
                  Personal
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeStep === 2 ? "active" : ""} `}
                  data-bs-toggle="tab"
                  onClick={() => setActiveStep(2)}
                >
                  Quotation
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {activeStep === 1 && (
                <div className="tab-pane active">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="full-name">
                            User Name
                          </label>
                          <input
                            value={coordinator.name}
                            onChange={handleChangeCoordinator}
                            type="text"
                            disabled
                            name="name"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="User name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Email Address
                          </label>
                          <input
                            disabled
                            value={coordinator.email}
                            onChange={handleChangeCoordinator}
                            type="email"
                            name="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Email address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Phone Number
                          </label>
                          <input
                            disabled
                            value={coordinator.cellNumber}
                            onChange={handleChangeCoordinator}
                            type="text"
                            name="cellNumber"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Placement Date
                          </label>
                          <input
                            disabled
                            value={moment(quotation.placementDate).format(
                              "MMMM Do YYYY"
                            )}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="placementDate"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Placement Date"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Delivery price
                          </label>
                          <input
                            min={0}
                            value={quotation.deliveredPrice}
                            onChange={handleChangeQuotation}
                            type="number"
                            name="deliveredPrice"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="delivery price"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Distance
                          </label>
                          <input
                            required
                            disabled
                            value={quotation.distanceFromKelowna}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="distanceFromKelowna"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            required
                            min={0}
                            value={servicesPrice.distanceFromKelowna_cost}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="distanceFromKelowna_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Distance Cost"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Max Workers
                          </label>
                          <input
                            required
                            disabled
                            value={quotation.maxWorkers}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="title"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Maximum workers"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            value={servicesPrice.maxWorkers_cost}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="maxWorkers_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Workers cost"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Service Frequency
                          </label>
                          <input
                            disabled
                            value={quotation.serviceFrequency}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="serviceFrequency"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Service Frequency"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Weekly Hours
                          </label>
                          <input
                            disabled
                            value={quotation.weeklyHours}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="weeklyHours"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Weekly hours"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Service Charge
                          </label>
                          <input
                            min={0}
                            value={quotation.serviceCharge}
                            onChange={handleChangeQuotation}
                            type="number"
                            name="serviceCharge"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Service Charge"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                          <li>
                            <button
                              type="button"
                              onClick={() => setActiveStep(2)}
                              className="btn btn-primary"
                            >
                              Next
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => closeModal(false)}
                              type="button"
                              data-bs-dismiss="modal"
                              className="link link-light"
                            >
                              Cancel
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {activeStep === 2 && (
                <div className="tab-pane active">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Use At Night
                          </label>
                          <input
                            disabled
                            value={quotation.useAtNight ? "Yes" : "No"}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="useAtNight"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Yes/No"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            disabled={!quotation.useAtNight}
                            value={servicesPrice.useAtNight_cost}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="useAtNight_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Use at night cost"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Use In Winter
                          </label>
                          <input
                            disabled
                            value={quotation.useInWinter ? "Yes" : "No"}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="title"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            value={servicesPrice.useInWinter_cost}
                            disabled={!quotation.useInWinter}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="useInWinter_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Use winter cost"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Number of units
                          </label>
                          <input
                            disabled
                            value={quotation.numUnits}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="numUnits"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Number of units"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            disabled={quotation.numUnits <= 0}
                            value={servicesPrice.numUnits_cost}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="numUnits_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Unit cost"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Date Till Use
                          </label>
                          <input
                            disabled
                            value={moment(quotation.dateTillUse).format(
                              "MMMM Do YYYY"
                            )}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="dateTillUse"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Designated Workers
                          </label>
                          <input
                            required
                            disabled
                            value={quotation.designatedWorkers ? "Yes" : "No"}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="designatedWorkers"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            value={servicesPrice.femaleWorkers_cost}
                            disabled={!quotation.designatedWorkers}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="femaleWorkers_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Female workers cost"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Worker Types
                          </label>
                          <input
                            disabled
                            value={quotation.workerTypes}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="workerTypes"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Worker Types"
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            disabled={quotation.workerTypes === "male"}
                            value={servicesPrice.workersType_cost}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="workersType_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Worker type cost"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Handwashing
                          </label>
                          <input
                            disabled
                            value={quotation.handwashing ? "Yes" : "No"}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="handwashing"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            value={servicesPrice.handwashing_cost}
                            disabled={!quotation.handwashing}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="handwashing_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Hand washing cost"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Hand Sanitizer Pump
                          </label>
                          <input
                            required
                            disabled
                            value={quotation.handSanitizerPump ? "Yes" : "No"}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="title"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Yes/No"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            value={servicesPrice.handSanitizerPump_cost}
                            disabled={!quotation.handSanitizerPump}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="handSanitizerPump_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="sanitizer pump cost"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Twice Weekly Service
                          </label>
                          <input
                            required
                            disabled
                            value={quotation.twiceWeeklyService ? "Yes" : "No"}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="title"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Yes/No"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            disabled={!quotation.twiceWeeklyService}
                            value={servicesPrice.twiceWeeklyService_cost}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="twiceWeeklyService_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Twice weekly service cost"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Special Requirements
                          </label>
                          <input
                            value={quotation.special_requirements}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="title"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Cost
                          </label>
                          <input
                            min={0}
                            value={servicesPrice.special_requirements_cost}
                            disabled={!quotation.special_requirements}
                            onChange={handleChangeServicePrice}
                            type="number"
                            name="special_requirements_cost"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="special requirements cost"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="form-label"
                            htmlFor="personal-email"
                          >
                            Status
                          </label>
                          <input
                            required
                            value={quotation.status}
                            onChange={handleChangeQuotation}
                            type="text"
                            name="title"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                          <li>
                            <button
                              type="submit"
                              onClick={() => setActiveStep(1)}
                              className="btn btn-primary"
                            >
                              Back
                            </button>
                          </li>
                          <li>
                            <button type="submit" className="btn btn-success">
                              Update Quotation
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => closeModal(false)}
                              type="button"
                              data-bs-dismiss="modal"
                              className="link link-light"
                            >
                              Cancel
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(EditQuotation));
