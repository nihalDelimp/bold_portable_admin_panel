import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import moment from "moment";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  productId: string;
  editProductModal: boolean;
  closeModal: (isModal: boolean) => void;
  getProductsListData: () => void;
}

function EditQuotation(props: MyComponentProps) {
  const {
    setLoading,
    productId,
    editProductModal,
    closeModal,
    getProductsListData,
  } = props;

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
    serviceFrequency: "",
    special_requirements: "",
    deliveredPrice:"",
    distanceFromKelowna:"",
    serviceCharge:"",
    useAtNight:"",
    useInWinter:"",
    numUnits:"",
    designatedWorkers:"",
    workerTypes:"",
    handwashing:"",
    handSanitizerPump:"",
    twiceWeeklyService:"",
    dateTillUse:"",
    status:"",
    weeklyHours:"",


  });

  useEffect(() => {
    getProductDetailsData();

  
  }, []);

  const getProductDetailsData = async () => {
    setLoading(true);
    const payload = {quote_id:productId}
    await authAxios()
     
      .post("/quotation/get-specific-quotation-from-all-collection", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resCoordinateData = response.data.data.quotation.coordinator;
            const resData = response.data.data.quotation;

            console.log(resData.deliveredPrice,"QuotationDataaaaaaa")
            

            const userFields = [
                "name",
                "email",
                "cellNumber"
              // "product_image",
            ];
             userFields.forEach((field) => {
                setCoordinator((prev) => ({
                ...prev,
                [field]: resCoordinateData[field],
              }));
            });

             const QuotationData =[
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
                "dateTillUse",
                "status",
                "weeklyHours",
            ]

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({...prev,[name]: value,}));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    setProduct((prev) => ({
      ...prev,
      [name]: fileList,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", product);
    const formData = new FormData();
    product.product_images.forEach((file) => {
      formData.append(`product_image`, file);
    });
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("product_price", product.product_price);
    formData.append("product_type", product.product_type);

    await authAxios()
      .put(`/product/update-products/${productId}`, formData)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success(response.data.message);
            closeModal(false);
            getProductsListData();
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
          console.log(error);
        }
      )
      .catch((error) => {
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
            <h5 className="title">Update Quotation</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#Quotation"
                >
                  Quotation
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="personal">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Name
                        </label>
                        <input
                          required
                          value={coordinator.name}
                          onChange={handleChange}
                          type="text"
                          readOnly
                          name="name"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Email Address
                        </label>
                        <input
                          required
                          value={coordinator.email}
                          onChange={handleChange}
                          type="text"
                          readOnly
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Phone Number
                        </label>
                        <input
                          required
                          value={coordinator.cellNumber}
                          onChange={handleChange}
                          type="text"
                          name="title"
                          readOnly
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Delivered Price
                        </label>
                       
                        <input
                          required
                          value={quotation.deliveredPrice}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                  
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Distance  Kelowna
                        </label>
                        <input
                          required
                          value={quotation.distanceFromKelowna}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Distance  Kelowna
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                       
                       
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Max Workers
                        </label>
                        <input
                          required
                          value={quotation.maxWorkers}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>  
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                         Service Frequency
                        </label>
                        <input
                          required
                          value={quotation.serviceFrequency}
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                         Special Requirements
                        </label>
                        <input
                          required
                          value={quotation.special_requirements}
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Weekly Hours
                        </label>
                        <input
                          required
                          value={quotation.weeklyHours}
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Service Charge
                        </label>
                        <input
                          required
                          value={quotation.serviceCharge}
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <button type="submit" className="btn btn-primary">
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
                    </div> */}
                  </div>
                </form>
              </div>

              <div className="tab-pane" id="Quotation">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">    
                  <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Use At Night
                        </label>
                        <input
                          required
                          value={quotation.useAtNight}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Use In Winter
                        </label>
                        <input
                          required
                          value={quotation.useInWinter}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Num Units
                        </label>
                        <input
                          required
                          value={quotation.numUnits}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Date Till Use
                        </label>
                        <input
                          required
                          value={moment(quotation.dateTillUse).format('MMMM Do YYYY')}
                          onChange={handleChange}
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
                        <label className="form-label" htmlFor="personal-email">
                        Designated Workers
                        </label>
                        <input
                          required
                          value={quotation.designatedWorkers}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Worker Types
                        </label>
                        <input
                          required
                          value={quotation.workerTypes}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Handwashing
                        </label>
                        <input
                          required
                          value={quotation.handwashing}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Hand Sanitizer Pump
                        </label>
                        <input
                          required
                          value={quotation.handSanitizerPump}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Cost
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Twice Weekly Service
                        </label>
                        <input
                          required
                          value={quotation.twiceWeeklyService}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Twice Weekly Service
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>  
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Special Requirements
                        </label>
                        <input
                          required
                          value={quotation.special_requirements}
                          onChange={handleChange}
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
                        <label className="form-label text-white" htmlFor="personal-email">
                        Special Requirements
                        </label>
                        <input
                          required
                          value=""
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                  
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                        Status
                        </label>
                        <input
                          required
                          value={quotation.status}
                          onChange={handleChange}
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
                          <button type="submit" className="btn btn-primary">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(EditQuotation));
