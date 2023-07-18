import React, { useState } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import IsLoggedinHOC from "../../Common/IsLoggedInHOC";
import CreatableSelect from "react-select/creatable";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  modal: boolean;
  closeModal: (isModal: boolean) => void;
  getListingData: () => void;
  elementData : any
}

function EditInventory(props: MyComponentProps) {
  const { setLoading, modal, closeModal, getListingData , elementData } = props;
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    category: [],
    description: "",
    type: "",
    quantity: "",
    gender: "male",
  });

  const handleSelectChange = (options: any) => {
    setSelectedOption(options);
    let selected_value: any = [];
    options.map((item: any) => selected_value.push(item.value));
    setFormData((prev) => ({
      ...prev,
      category: selected_value,
    }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = formData;
    if (payload.category.length === 0) {
      toast.error("Service category is required!");
    } else if (payload.description.length < 5) {
      toast.error("Description must be at least 10 characters long!");
    } else {
      setLoading(true);
      await authAxios()
        .post("/inventory/save", payload)
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              toast.success(response.data?.message);
              getListingData();
              closeModal(false);
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
    }
  };


  return (
    <div
      className={`modal fade ${modal ? "show" : "hide"}`}
      style={{ display: modal ? "block" : "none" }}
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-top" role="document">
        <div className="modal-content">
          <a
            className="close cursor_ponter"
            onClick={() => closeModal(false)}
            data-bs-dismiss="modal"
          >
            <em className="icon ni ni-cross-sm"></em>
          </a>
          <div className="modal-body modal-body-md">
            <h5 className="title">Edit Enventory</h5>
            <div className="tab-content">
              <div className="tab-pane active" id="personal">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Product name
                        </label>
                        <input
                          required
                          onChange={handleChangeInput}
                          name="productName"
                          value={formData.productName}
                          className="form-control"
                          id="productName"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Gender
                        </label>
                        <select
                          required
                          name="gender"
                          value={formData.gender}
                          className="form-control"
                          onChange={handleChangeSelect}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                        Type
                        </label>
                        <select
                          required
                          name="type"
                          value={formData.type}
                          className="form-control"
                          onChange={handleChangeSelect}
                        >
                          <option value="standard">Standard</option>
                          <option value="standard With Sink">Standard With Sink</option>
                          <option value="wheel Chair Accessible">Wheel Chair Accessible</option>
                          <option value="high rise capable">High rise capable</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Quantity
                        </label>
                        <input
                          required
                          type="number"
                          onChange={handleChangeInput}
                          name="quantity"
                          value={formData.quantity}
                          className="form-control"
                          id="productName"
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone-no">
                          Categories
                        </label>
                        <CreatableSelect
                          isMulti
                          value={selectedOption}
                          options={options}
                          onChange={handleSelectChange}
                          placeholder="Createable"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Description
                        </label>
                        <textarea
                          required
                          minLength={10}
                          onChange={handleChangeTextArea}
                          name="description"
                          value={formData.description}
                          className="form-control"
                          id="description"
                          placeholder="Enter description..."
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => closeModal(false)}
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

export default IsLoadingHOC(IsLoggedinHOC(EditInventory));