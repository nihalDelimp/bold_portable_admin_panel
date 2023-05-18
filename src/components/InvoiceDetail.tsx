import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link, useParams } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import Pagination from "../Common/Pagination";
import { getFormatedDate ,getDateWithoutTime } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function InvoiceDetail(props: MyComponentProps) {
  const { setLoading } = props;
  const params = useParams();
  const [paymetData, setPaymentData] = useState<any>({});
  const [invoiceData, setInvoice] = useState<any>({});
  const [userData, setUserData] = useState<any>({});

  console.log("PaymentData", paymetData);
  console.log("userData", userData);

  useEffect(() => {
    getInvoiceDetailsData();
  }, []);

  const getInvoiceDetailsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/payment/subscription/${params.id}`)
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
            <div className="nk-block-head">
              <div className="nk-block-between g-3">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">
                    Invoice{" "}
                    <strong className="text-primary small">#746F5K2</strong>
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
                    to="/invoices"
                    className="btn btn-outline-light bg-white d-none d-sm-inline-flex"
                  >
                    <em className="icon ni ni-arrow-left"></em>
                    <span>Back</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="nk-block">
              <div className="invoice">
                <div className="invoice-action">
                  <a
                    className="btn btn-icon btn-lg btn-white btn-dim btn-outline-primary"
                    href="html/invoice-print.html"
                    target="_blank"
                  >
                    <em className="icon ni ni-printer-fill"></em>
                  </a>
                </div>
                <div className="invoice-wrap">
                  <div className="invoice-brand text-center">
                    <img
                      className="logo-dark logo-img"
                      src={require("../images/bold_port.png")}
                      alt="logo-dark"
                    />
                  </div>
                  <div className="invoice-head">
                    <div className="invoice-contact">
                      <span className="overline-title">Invoice To</span>
                      <div className="invoice-contact-info">
                        <h4 className="title">Gregory Ander son</h4>
                        <ul className="list-plain">
                          <li>
                            <em className="icon ni ni-map-pin-fill"></em>
                            <span>
                              House #65, 4328 Marion Street
                              <br />
                              Newbury, VT 05051
                            </span>
                          </li>
                          <li>
                            <em className="icon ni ni-call-fill"></em>
                            <span>+{userData.mobile}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="invoice-desc">
                      <h3 className="title">Invoice</h3>
                      <ul className="list-plain">
                        <li className="invoice-id">
                          <span>Invoice ID</span>:<span>66K5W3</span>
                        </li>
                        <li className="invoice-date">
                          <span>Date</span>:<span> {getDateWithoutTime(invoiceData?.createdAt)}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="invoice-bills">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="w-150px">Item ID</th>
                            <th className="w-60">Description</th>
                            <th>Amount Due</th>
                            <th>Amount Remaining</th>
                            <th>Amount Paid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24108054</td>
                            <td>
                              Dashlite - Conceptual App Dashboard - Regular
                              License
                            </td>
                            <td>${paymetData.amount_due}</td>
                            <td>${paymetData.amount_remaining}</td>
                            <td>${paymetData.amount_paid}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Subtotal</td>
                            <td>${paymetData.subtotal}</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Processing fee</td>
                            <td>$0.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Grand Total</td>
                            <td>${paymetData.total}</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="nk-notes ff-italic fs-12px text-soft">
                        {" "}
                        Invoice was created on a computer and is valid without
                        the signature and seal.{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-icon alert-primary" role="alert">
        <em className="icon ni ni-alert-circle"></em>
        <strong>Order has been placed</strong>. Your will be redirect for make
        your payment.
      </div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(InvoiceDetail));
