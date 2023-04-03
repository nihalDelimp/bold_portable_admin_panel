import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../Components/Login";
import Home from "../Components/Dashboard";
import ProductList from "../Components/ProductList";
import Customers from "../Components/Customers";
import PageNoteFound from "../Components/PageNotFound";
import AdminProfile from "../Common/AdminProfile";
import ViewProduct from "../Components/ViewProduct";
import ViewCustomer from "../Components/ViewCustomer";
import Orders from "../Components/Orders";
import InvoicesList from "../Components/InvoicesList";
import InvoiceDetail from "../Components/InvoiceDetail";


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
                <Customers />
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
            path="/invoices"
            element={
              <PrivateRoute>
                <InvoicesList />
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
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default RootRouter;
