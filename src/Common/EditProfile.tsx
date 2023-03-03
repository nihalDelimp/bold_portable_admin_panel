import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "../config/config";
import { RootState } from "../Redux/rootReducer";
import { toast } from "react-toastify";

function EditProfile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      const userFields = ["name", "email", "mobile"];
      userFields.forEach((field) => {
        setUserProfile((prev) => ({
          ...prev,
          [field]: user[field],
        }));
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = userProfile;
    await authAxios()
      .post("/auth/update-user-profile", payload)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success("User update successfully");
            console.log("resposnse Data", response.data.data);
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <div className="modal fade" role="dialog" id="profile-edit">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <a href="#" className="close" data-bs-dismiss="modal">
            <em className="icon ni ni-cross-sm"></em>
          </a>
          <div className="modal-body modal-body-md">
            <h5 className="title">Update Profile</h5>
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
              {/* <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#address">
                  Address
                </a>
              </li> */}
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="personal">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          onChange={handleChange}
                          name="name"
                          value={userProfile.name}
                          className="form-control"
                          id="full-name"
                          placeholder="Enter Full name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          onChange={handleChange}
                          name="email"
                          value={userProfile.email}
                          className="form-control"
                          id="personal-email"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone-no">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          onChange={handleChange}
                          name="mobile"
                          value={userProfile.mobile}
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="birth-day">
                          Date of Birth
                        </label>
                        <input
                          required
                          onChange={handleChange}
                          name="dateOfBirth"
                          value={userProfile.dateOfBirth}
                          type="text"
                          className="form-control date-picker"
                          id="birth-day"
                          placeholder="02/24/2021"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="nationality">
                          Nationality
                        </label>
                        <input
                          type="text"
                          className="form-control date-picker"
                          id="nationality"
                          value="Canadian"
                        />
                      </div>
                    </div> */}

                    <div className="col-12">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="latest-sale"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="latest-sale"
                        >
                          Use full name to display{" "}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <button type="submit" className="btn btn-primary">
                            Update Profile
                          </button>
                        </li>
                        <li>
                          <button type="button"
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

              {/* <div className="tab-pane" id="address">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-l1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address-l1"
                        value="2337 Kildeer Drive"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-l2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address-l2"
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-st">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address-st"
                        value="Kentucky"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="address-county">
                        Country
                      </label>
                      <select
                        className="form-select js-select2"
                        id="address-county"
                      >
                        <option>Canada</option>
                        <option>United State</option>
                        <option>United Kindom</option>
                        <option>Australia</option>
                        <option>India</option>
                        <option>Bangladesh</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <a
                          href="#"
                          data-bs-dismiss="modal"
                          className="btn btn-primary"
                        >
                          Update Address
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-bs-dismiss="modal"
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
