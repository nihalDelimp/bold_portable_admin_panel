import React from "react";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import IsLoadingHOC from "./../Common/IsLoadingHOC";

function InvoiceDetail() {
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
                        <span className="text-base">18 Dec, 2019 01:02 PM</span>
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
                            <span>+012 8764 556</span>
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
                          <span>Date</span>:<span>26 Jan, 2020</span>
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
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24108054</td>
                            <td>
                              Dashlite - Conceptual App Dashboard - Regular
                              License
                            </td>
                            <td>$40.00</td>
                            <td>5</td>
                            <td>$200.00</td>
                          </tr>
                          <tr>
                            <td>24108054</td>
                            <td>6 months premium support</td>
                            <td>$25.00</td>
                            <td>1</td>
                            <td>$25.00</td>
                          </tr>
                          <tr>
                            <td>23604094</td>
                            <td>
                              Invest Management Dashboard - Regular License
                            </td>
                            <td>$131.25</td>
                            <td>1</td>
                            <td>$131.25</td>
                          </tr>
                          <tr>
                            <td>23604094</td>
                            <td>6 months premium support</td>
                            <td>$78.75</td>
                            <td>1</td>
                            <td>$78.75</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Subtotal</td>
                            <td>$435.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Processing fee</td>
                            <td>$10.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>TAX</td>
                            <td>$43.50</td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td colSpan={2}>Grand Total</td>
                            <td>$478.50</td>
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
    <strong>Order has been placed</strong>. Your will be redirect for make your payment. 
</div>
    </div>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(InvoiceDetail));
