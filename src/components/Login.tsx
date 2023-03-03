import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../Redux/rootReducer";
import { useAppDispatch } from "../Redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (accessToken) {
      navigate("/products");
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", userInput);
    const payload = userInput;
    await withoutAuthAxios()
      .post("/auth/login", payload)
      .then(
        (response) => {
          if (response.data.status === 1) {
            const resData = response.data.data;
            const user = resData.user;
            if (user && user.user_type === "ADMIN") {
              toast.success("You are logged in successfully");
              dispatch(setAccessToken(resData.token));
              dispatch(setuser(resData.user));
              dispatch(setIsAuthenticated(true));
              navigate("/");
              window.location.reload();
            }
            else {
              toast.error(`You don't have access to login`);
            }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="nk-wrap nk-wrap-nosidebar">
      <div className="nk-content ">
        <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <a href="html/index.html" className="logo-link">
              <img
                className="logo-light logo-img logo-img-lg"
                src="./images/logo.png"
                alt="logo"
              />
              <img
                className="logo-dark logo-img logo-img-lg"
                src="./images/logo-dark.png"
                alt="logo-dark"
              />
            </a>
          </div>
          <div className="card">
            <div className="card-inner card-inner-lg">
              <div className="nk-block-head">
                <div className="nk-block-head-content">
                  <h4 className="nk-block-title">Sign-In</h4>
                  <div className="nk-block-des">
                    <p>
                      Access the Dashlite panel using your email and passcode.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Email or Username
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="default-01"
                      placeholder="Enter your email address or username"
                      required
                      value={userInput.email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="password">
                      Passcode
                    </label>
                    {/* <a
                      className="link link-primary link-sm"
                      href="html/pages/auths/auth-reset-v2.html">
                      Forgot Code?
                    </a> */}
                  </div>
                  <div className="form-control-wrap">
                    <a
                      href="#"
                      className="form-icon form-icon-right passcode-switch lg"
                      data-target="password"
                    >
                      <em className="passcode-icon icon-show icon ni ni-eye"></em>
                      <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your passcode"
                      required
                      value={userInput.password}
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              {/* <div className="form-note-s2 text-center pt-4">
                {" "}
                New on our platform?{" "}
                <a href="#">
                  Create an account
                </a>
              </div> */}
              <div className="text-center pt-4 pb-3">
                <h6 className="overline-title overline-title-sap">
                  <span>OR</span>
                </h6>
              </div>
              <ul className="nav justify-center gx-4">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Facebook
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Google
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="nk-footer nk-auth-footer-full">
          <div className="container wide-lg">
            <div className="row g-3">
              <div className="col-lg-6 order-lg-last">
                <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Terms & Condition
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Help
                    </a>
                  </li>
                  <li className="nav-item dropup">
                    <a
                      className="dropdown-toggle dropdown-indicator has-indicator nav-link"
                      data-bs-toggle="dropdown"
                      data-offset="0,10"
                    >
                      <span>English</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                      <ul className="language-list">
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/english.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">English</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/spanish.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Español</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/french.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Français</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="language-item">
                            <img
                              src="./images/flags/turkey.png"
                              alt=""
                              className="language-flag"
                            />
                            <span className="language-name">Türkçe</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="nk-block-content text-center text-lg-left">
                  <p className="text-soft">
                    &copy; 2022 Dashlite. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
