import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import Login from "../components/Login";
import NavBar from "../Common/NavBar";
import Sidebar from "../Common/Sidebar";
import Footer from "../Common/Footer";
import Home from "../components/Home";
import ProductList from "../components/ProductList";
import Customers from "../components/Customers";
import PageNoteFound from "../Common/PageNoteFound";
import AdminProfile from "../Common/AdminProfile";
import ViewProduct from "../components/ViewProduct";
import ViewCustomer from "../components/ViewCustomer";
import Orders from "../components/Orders";

function RootRouter() {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Router>{accessToken ? <PrivateRouter /> : <PublicRouter />}</Router>
    </>
  );
}

function PrivateRouter(props: any) {
  return (
    <>
      <Sidebar />
      <div className="nk-wrap">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/view-user/:id" element={<ViewCustomer />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

function PublicRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<PageNoteFound />} />
    </Routes>
  );
}

export default RootRouter;
