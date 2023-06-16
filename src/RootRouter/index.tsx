import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Dashboard";
import ProductList from "../components/ProductList";
import CustomersList from "../components/CustomersList";
import PageNoteFound from "../components/PageNotFound";
import AdminProfile from "../Common/AdminProfile";
import ViewProduct from "../components/ViewProduct";
import ViewCustomer from "../components/ViewCustomer";
import Orders from "../components/Orders";
import SubscriptionList from "../components/SubscriptionList";
import NotificationDetails from "../components/NotificationDetails";
import InvoiceDetail from "../components/InvoiceDetail";
import QuotationsList from "../components/QuotationsList";
import SubscriptionDetail from "../components/SubscriptionDetail";
import SendEmail from "../components/SendEmail";
import UserRequestServices from "../components/UserReqServices";

function RootRouter() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-product/:id"
            element={
              <PrivateRoute>
                <ViewProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-user/:id"
            element={
              <PrivateRoute>
                <ViewCustomer />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <CustomersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/quotations"
            element={
              <PrivateRoute>
                <QuotationsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <PrivateRoute>
                <SubscriptionList />
              </PrivateRoute>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <UserRequestServices />
              </PrivateRoute>
            }
          />
          <Route
            path="/notification-details/:id"
            element={
              <PrivateRoute>
                <NotificationDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice-detail/:id"
            element={
              <PrivateRoute>
                <InvoiceDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription-detail/:id"
            element={
              <PrivateRoute>
                <SubscriptionDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/send-email"
            element={
              <PrivateRoute>
                <SendEmail />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default RootRouter;
