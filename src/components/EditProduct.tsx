import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "../config/config";
import { RootState } from "../Redux/rootReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IsLoadingHOC from "../Common/IsLoadingHOC";

function EditProduct(props: any) {
  const {
    setLoading,
    productId,
    editProductModal,
    setEditProductModal,
    getProductsListData,
  } = props;

  const [product, setProduct] = useState({
    title: "",
    description: "",
    product_image: "",
    product_price: "",
  });

  useEffect(() => {
    getProductDetailsData();
  }, []);

  const getProductDetailsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/product/get-specific-products/${productId}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            const userFields = ["title", "product_price", "description" , "product_image"];
            userFields.forEach((field) => {
              setProduct((prev) => ({
                ...prev,
                [field]: resData[field],
              }));
            });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    setProduct((prev) => ({
      ...prev,
      [name]: fileList[0],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", product);
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("product_image", product.product_image);
    formData.append("product_price", product.product_price);
    await authAxios()
      .put(`/product/update-products/${productId}`, formData)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success("Data updated successfully");
            setEditProductModal(false);
            getProductsListData();
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
          console.log(error);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <div
      className={`modal fade ${editProductModal ? "show" : "hide"}`}
      style={{ display: editProductModal ? "block" : "none" }}
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <a
            onClick={() => setEditProductModal(false)}
            className="close cursor_ponter"
            data-bs-dismiss="modal"
          >
            <em className="icon ni ni-cross-sm"></em>
          </a>
          <div className="modal-body modal-body-md">
            <h5 className="title">Update Product</h5>
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
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="personal">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                          Product Title
                        </label>
                        <input
                          required
                          value={product.title}
                          onChange={handleChange}
                          type="text"
                          name="title"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-email">
                          Sale Price
                        </label>
                        <input
                          required
                          className="form-control"
                          value={product.product_price}
                          name="product_price"
                          onChange={handleChange}
                          type="number"
                          placeholder="Enter price"
                          id="sale-price"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone-no">
                          Description
                        </label>
                        <textarea
                          required
                          className="form-control"
                          value={product.description}
                          onChange={handleChangeTextArea}
                          name="description"
                          id="inputEmail4"
                          placeholder="Enter description"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group product_details_image">
                        <label className="form-label" htmlFor="phone-no">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          name="product_image"
                          onChange={handleChangeImage}
                          className="form-control"
                          id="inputPassword4"
                          placeholder="upload image"
                        />
                         <span className="data-value">
                                <img
                                  src={`${process.env.REACT_APP_BASEURL}/${product?.product_image}`}
                                  alt=""
                                  className="thumb"
                                />
                              </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <button type="submit" className="btn btn-primary">
                            Update Product
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setEditProductModal(false)}
                            type="button"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(EditProduct);
