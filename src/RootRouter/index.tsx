import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login";
import Home from "../components/Dashboard";
import CustomersList from "../components/CustomersList";
import PageNoteFound from "../components/PageNotFound";
import AdminProfile from "../Common/AdminProfile";
import ViewCustomer from "../components/ViewCustomer";
import SubscriptionList from "../components/SubscriptionManage/SubscriptionList";
import NotificationDetails from "../components/NotificationDetails";
import SubscriptionDetail from "../components/SubscriptionManage/SubscriptionDetail";
import QuotationsList from "../components/QuotationManage/QuotationsList";
import SendEmail from "../components/SendEmail";
import ServiceRequests from "../components/ServiceRequests";
import ServicesList from "../components/ServiceManagement/ServicesList";
import InventoryList from "../components/InventoryManagement";
import AssignQRCode from "../components/AssignQRCode";
import CategoryManagement from "../components/CategoryManagement";
import InventoryTypeList from "../components/InventoryTypesManage";
import InventoryDetail from "../components/InventoryManagement/InventoryDetail";

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
            path="/service-requests"
            element={
              <PrivateRoute>
                <ServiceRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="/service-list"
            element={
              <PrivateRoute>
                <ServicesList />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <InventoryList />
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
          <Route
            path="/assign-qr-code"
            element={
              <PrivateRoute>
                <AssignQRCode />
              </PrivateRoute>
            }
          />
          <Route
            path="/category-management"
            element={
              <PrivateRoute>
                <CategoryManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory-type-management"
            element={
              <PrivateRoute>
                <InventoryTypeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory-detail"
            element={
              <PrivateRoute>
                <InventoryDetail />
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
