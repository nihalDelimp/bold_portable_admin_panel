import React, { useState } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    product_image: "",
    product_price: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", product);
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("product_image", product.product_image);
    formData.append("product_price", product.product_price);
    await authAxios()
      .post("/product/add-products", formData)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success("product add successfully");
            navigate("/products");
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
    console.log("fileList", fileList);
    setProduct((prev) => ({
      ...prev,
      [name]: fileList[0],
    }));
  };

  return (
    <>
      <div
        className="nk-add-product toggle-slide toggle-slide-right"
        data-content="addProduct"
        data-toggle-screen="any"
        data-toggle-overlay="true"
        data-toggle-body="true"
        data-simplebar
      >
        <div className="nk-block-head">
          <div className="nk-block-head-content">
            <h5 className="nk-block-title">New Product</h5>
            <div className="nk-block-des">
              <p>Add information and add new product.</p>
            </div>
          </div>
        </div>
        <div className="nk-block">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Product Title</label>
                  <div className="form-control-wrap">
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
              </div>
              <div className="col-mb-6">
                <div className="form-group">
                  <label className="form-label">Rent Price</label>
                  <div className="form-control-wrap">
                    <input
                      required
                      className="form-control"
                      value={product.product_price}
                      name="product_price"
                      onChange={handleChange}
                      type="number"
                      placeholder="Rent price"
                      id="sale-price"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-mb-6">
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <div className="form-control-wrap">
                    <input type="text" className="form-control" id="stock" />
                  </div>
                </div>
              </div> */}

              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <div className="form-control-wrap">
                    <textarea
                      required
                      className="form-control"
                      value={product.description}
                      onChange={handleChangeTextArea}
                      name="description"
                      id="inputEmail4"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Upload Image</label>
                  <div className="form-control-wrap">
                    <input
                      required
                      type="file"
                      name="product_image"
                      onChange={handleChangeImage}
                      className="form-control"
                      id="inputPassword4"
                      placeholder="upload image"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="col-12">
              <div className="upload-zone small bg-lighter my-2">
                <div className="dz-message">
                  <span className="dz-message-text">Drag and drop file</span>
                </div>
              </div>
            </div> */}

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  <em className="icon ni ni-plus"></em>
                  <span>Add New</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
