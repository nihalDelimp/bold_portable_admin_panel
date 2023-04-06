import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";
import DeleteConfirmationModal from "../Common/DeleteConfirmation";
import Pagination from "../Common/Pagination";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function ProductList(props: MyComponentProps) {
  const [products, setProduct] = useState<any[]>([]);
  const [editProductModal, setEditProductModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const { setLoading } = props;

  useEffect(() => {
    getProductsListData();
  }, []);

  const getProductsListData = async () => {
    setLoading(true);
    await authAxios()
      .get("/product/get-products")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            setProduct(response.data.data.products);
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

  const handleDeleteProduct = async () => {
    setLoading(true);
    await authAxios()
      .delete(`/product/delete-products/${productId}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data?.message);
            setDeleteModal(false);
            getProductsListData();
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
  };

  const handleEditModal = (product_id: string) => {
    setProductId(product_id);
    setEditProductModal(true);
  };

  const handleDeleteModal = (product_id: string) => {
    setProductId(product_id);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setDeleteModal(false);
    setEditProductModal(false);
  };

  return (
    <>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block-head nk-block-head-sm">
                <div className="nk-block-between">
                  <div className="nk-block-head-content">
                    <h3 className="nk-block-title page-title">Products</h3>
                  </div>
                  <div className="nk-block-head-content">
                    <div className="toggle-wrap nk-block-tools-toggle">
                      <a
                        href="#"
                        className="btn btn-icon btn-trigger toggle-expand me-n1"
                        data-target="pageMenu"
                      >
                        <em className="icon ni ni-more-v"></em>
                      </a>
                      <div
                        className="toggle-expand-content"
                        data-content="pageMenu"
                      >
                        <ul className="nk-block-tools g-3">
                          <li>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-right">
                                <em className="icon ni ni-search"></em>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                id="default-04"
                                placeholder="Quick search by id"
                              />
                            </div>
                          </li>
                          <li>
                            <div className="drodown">
                              <a
                                href="#"
                                className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                                data-bs-toggle="dropdown"
                              >
                                Status
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a href="#">
                                      <span>New Items</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Featured</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Out of Stock</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li className="nk-block-tools-opt">
                            <a
                              data-target="addProduct"
                              className="toggle btn btn-icon btn-primary d-md-none"
                            >
                              <em className="icon ni ni-plus"></em>
                            </a>
                            <a
                              data-target="addProduct"
                              className="toggle btn btn-primary d-none d-md-inline-flex"
                            >
                              <em className="icon ni ni-plus"></em>
                              <span>Add Product</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="nk-tb-list is-separate mb-3">
                  <div className="nk-tb-item nk-tb-head">
                    <div className="nk-tb-col nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="pid"
                        />
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                    <div className="nk-tb-col tb-col-sm">
                      <span>Product Name</span>
                    </div>
                    <div className="nk-tb-col">
                      <span>Rent Price</span>
                    </div>
                    <div className="nk-tb-col">
                      <span>Description</span>
                    </div>
                    <div className="nk-tb-col">
                      <span>Action</span>
                    </div>
                  </div>

                  {products &&
                    products.length > 0 &&
                    products?.map((item: any) => (
                      <div key={item._id} className="nk-tb-item">
                        <div className="nk-tb-col nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="pid10"
                            />
                            <label className="custom-control-label"></label>
                          </div>
                        </div>
                        <div className="nk-tb-col tb-col-sm">
                          <span className="tb-product">
                            {item.product_images &&
                              item.product_images.length > 0 && (
                                // item.product_images.map((image : any) =>(
                                <img
                                  src={`${process.env.REACT_APP_BASEURL}/${item.product_images[0].image_path}`}
                                  alt=""
                                  className="thumb"
                                />
                              )}
                            <span className="title">{item.title}</span>
                          </span>
                        </div>

                        <div className="nk-tb-col">
                          <span className="tb-lead">{item.product_price}</span>
                        </div>

                        <div className="nk-tb-col tb-col-md">
                          <span className="tb-sub">{item.description}</span>
                        </div>

                        <div className="nk-tb-col nk-tb-col-tools">
                          <ul className="gx-1 my-n1">
                            <li className="me-n1">
                              <div className="dropdown">
                                <a
                                  className="dropdown-toggle btn btn-icon btn-trigger"
                                  data-bs-toggle="dropdown"
                                >
                                  <em className="icon ni ni-more-h"></em>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <ul className="link-list-opt no-bdr">
                                    <li>
                                      <a
                                        onClick={() =>
                                          handleEditModal(item._id)
                                        }
                                      >
                                        <em className="icon ni ni-edit"></em>
                                        <span>Edit Product</span>
                                      </a>
                                    </li>
                                    <li>
                                      <Link to={`/view-product/${item._id}`}>
                                        <em className="icon ni ni-eye"></em>
                                        <span>View Product</span>
                                      </Link>
                                    </li>
                                    {/* <li>
                                    <a href="#">
                                      <em className="icon ni ni-activity-round"></em>
                                      <span>Product Orders</span>
                                    </a>
                                  </li> */}
                                    <li>
                                      <a
                                        className="cursor_ponter"
                                        onClick={() =>
                                          handleDeleteModal(item._id)
                                        }
                                      >
                                        <em className="icon ni ni-trash"></em>
                                        <span>Remove Product</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
                {products && products.length > 0 && (
                  <Pagination
                    totalCount={totalCount}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemPerPage={setItemPerPage}
                  />
                )}
              </div>
              <AddProduct getProductsListData={getProductsListData} />
            </div>
          </div>
        </div>
      </div>
      {editProductModal && (
        <EditProduct
          productId={productId}
          editProductModal={editProductModal}
          setEditProductModal={setEditProductModal}
          getProductsListData={getProductsListData}
          closeModal={closeModal}
        />
      )}
      {deleteModal && (
        <DeleteConfirmationModal
          modal={deleteModal}
          closeModal={closeModal}
          confirmedDelete={handleDeleteProduct}
        />
      )}
    </>
  );
}

export default IsLoadingHOC(IsLoggedinHOC(ProductList));
