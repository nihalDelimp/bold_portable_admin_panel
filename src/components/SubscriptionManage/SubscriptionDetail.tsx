import React, { useState, useEffect } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../../Common/IsLoggedInHOC";
import {
  getFormatedDate,
  getDateWithoutTime,
  CapitalizeFirstLetter,
} from "../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function SubscriptionDetail(props: MyComponentProps) {
  const { setLoading } = props;
  const { invoiceId } = useSelector((state: RootState) => state.app);
  const [paymetData, setPaymentData] = useState<any>(null);
  const [invoiceData, setInvoice] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [subscription, setsubscription] = useState<any>(null);


  useEffect(() => {
    getSubscriptionDetailsData();
  }, []);

  const getSubscriptionDetailsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/payment/subscription/${invoiceId}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data.payments[0];
            const user = resData.subscription.user;
            const payment = resData.payment;
            setPaymentData(payment);
            setUserData(user);
            setInvoice(resData);
            setsubscription(resData.subscription);
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
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            {/* <div className="nk-block-head">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">
                    Invoice{" "}
                    <strong className="text-primary small">
                      #
                      {paymetData &&
                        paymetData?.id &&
                        paymetData?.id.slice(-8)?.toUpperCase()}
                    </strong>
                  </h3>
                  <div className="nk-block-des text-soft">
                    <ul className="list-inline">
                      <li>
                        Created At:{" "}
                        <span className="text-base">
                          {getFormatedDate(invoiceData?.createdAt)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="nk-block-head-content">
                  <Link
                    to="/subscriptions"
                    className="btn btn-outline-light bg-white d-none d-sm-inline-flex"
                  >
                    <em className="icon ni ni-arrow-left"></em>
                    <span>Back</span>
                  </Link>
                </div>
              </div>
            </div> */}
            <div className="nk-block">
              <div className="invoice invoice--container">
                {/* <div className="invoice-action">
                  <a
                    className="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary"
                    href={paymetData?.invoice_pdf}
                  >
                    <em className="icon ni ni-download"></em>
                  </a>
                </div> */}

                <div className="invoice--header">
                  <div className="invoice-logo">
                    <img
                      className="logo-dark"
                      src={require("../../images/invoice-logo.png")}
                      alt="logo-dark"
                    />
                  </div>

                  <div className="invoice-download">
                    <h3>Invoice</h3> <a
                      className="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary"
                      href={paymetData?.invoice_pdf}
                    >
                      <em className="icon ni ni-download"></em>
                    </a>
                  </div>

                </div>

                <div className="invoice-head-center">
                  <h3>Invoice</h3>
                </div>

                <div className="invoice-wrap">
                  {/* <div className="text-center">
                    <h2>
                      <u>Bold Potable Invoice</u>
                    </h2>
                    <img
                      src={subscription?.qrCode}
                      alt="qr_code"
                    />
                  </div> */}
                  <div className="invoice-head">
                    <div className="invoice-contact">
                      {/* <span className="overline-title">Invoice To</span> */}
                      <div className="invoice-contact-info">
                        <h4 className="title heading--invoice">
                          {userData &&
                            userData.name &&
                            CapitalizeFirstLetter(userData?.name)}
                        </h4>
                        <div className="details--invoice--list">
                          <ul className="list-plain">
                            <li>
                              <img
                                className="invoice-phone"
                                src={require("../../images/call-invoice.png")}
                                alt="invoice-phone"
                              />
                              {/* <em className="icon ni ni-call-fill"></em> */}
                              <span>{userData?.mobile}</span>
                            </li>
                            <li>
                              <img
                                className="invoice-location"
                                src={require("../../images/location-invoice.png")}
                                alt="invoice-location"
                              />
                              {/* <em className="icon ni ni-map-pin-fill"></em> */}
                              <span>{userData?.address}</span>
                            </li>
                          </ul>

                          <ul className="list-plain">
                            <li className="invoice-id">
                              <span>Subscription ID:</span>
                              <span>
                                {subscription?.subscription
                                  ?.slice(-6)
                                  ?.toUpperCase()}
                              </span>
                            </li>
                            <li className="invoice-date">
                              <span>Date:</span>
                              <span>
                                {" "}
                                {getDateWithoutTime(invoiceData?.createdAt)}
                              </span>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                    {/* <div className="invoice-desc">
                      <h3 className="title">Invoice</h3>
                      <ul className="list-plain">
                        <li className="invoice-id">
                          <span>Subscription ID</span>:
                          <span>
                            {subscription?.subscription
                              ?.slice(-6)
                              ?.toUpperCase()}
                          </span>
                        </li>
                        <li className="invoice-date">
                          <span>Date</span>:
                          <span>
                            {" "}
                            {getDateWithoutTime(invoiceData?.createdAt)}
                          </span>
                        </li>
                      </ul>
                    </div> */}
                  </div>


                  <div className="invoice-bills-table">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="width-md">Quotation Type</th>
                            <th className="text-center">Types</th>
                            <th className="width-small">Male</th>
                            <th className="width-small">Female</th>
                            <th className="width-small">Other</th>
                            <th className="width-md text-center">Units</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="height-50"></tr>
                          <tr>
                            <td>Construction</td>
                            <td className="text-center">Hand wash</td>
                            <td className="text-center">2</td>
                            <td className="text-center border-xside">1</td>
                            <td className="text-center"></td>
                            <td className="text-center">3</td>
                            <td>$10</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td className="text-center">Wheelchair </td>
                            <td className="text-center">1</td>
                            <td className="text-center border-xside">3</td>
                            <td className="text-center">1</td>
                            <td className="text-center">5</td>
                            <td>$10</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td className="text-center">Hand wash </td>
                            <td className="text-center"></td>
                            <td className="text-center border-xside">1</td>
                            <td className="text-center">1</td>
                            <td className="text-center">2</td>
                            <td>$10</td>
                          </tr>
                        </tbody>

                      </table>

                      <span className="border--bottom"></span>

                      <div className="total--bill--div">
                        <table className="table">
                          <tbody>


                            <tr>
                              <td>Subtotal</td>
                              <td>$500 </td>
                            </tr>
                            <tr>
                              <td>Processing fee</td>
                              <td>$10 </td>
                            </tr>

                            <tr className="border-y">
                              <td>Grand Total</td>
                              <td>$510 </td>
                            </tr>

                          </tbody>

                        </table>
                      </div>


                      <div className="bottom--invoice">
                        <h4 className="heading--invoice">Bold Portable</h4>

                        <div className="details--invoice--list">
                          <ul className="list-plain">
                            <li>
                              <img
                                className="invoice-phone"
                                src={require("../../images/call-invoice.png")}
                                alt="invoice-phone"
                              />
                              {/* <em className="icon ni ni-call-fill"></em> */}
                              <span>{userData?.mobile}</span>
                            </li>
                            <li>
                              <img
                                className="invoice-location"
                                src={require("../../images/location-invoice.png")}
                                alt="invoice-location"
                              />
                              {/* <em className="icon ni ni-map-pin-fill"></em> */}
                              <span>{userData?.address}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="nk-notes ff-italic fs-12px text-soft">
                          {" "}
                          *Invoice was created on a computer and is valid without the signature and seal.{" "}
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* <div className="invoice-bills">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="w-150px">ID</th>
                            <th>Email</th>
                            <th className="w-20">Phone</th>
                            <th className="w-15">Quotation Type</th>
                            <th>Amount Paid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {subscription?.subscription
                                ?.slice(-8)
                                ?.toUpperCase()}
                            </td>

                            <td>{userData?.email}</td>
                            <td>{userData?.mobile}</td>
                            <td>{subscription?.quotationType}</td>
                            <td>${paymetData?.amount_paid / 100}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Subtotal</td>
                            <td>${paymetData?.subtotal / 100}</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Processing fee</td>
                            <td>$0.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Grand Total</td>
                            <td>${paymetData?.total / 100}</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="nk-notes ff-italic fs-12px text-soft">
                        {" "}
                        Invoice was created on a computer and is valid without
                        the signature and seal.{" "}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-icon alert-primary" role="alert">
        <em className="icon ni ni-alert-circle"></em>
        <strong>Order has been placed.</strong>
      </div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(SubscriptionDetail));
