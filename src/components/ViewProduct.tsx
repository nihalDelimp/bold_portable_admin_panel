import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const ViewProduct = (props: MyComponentProps) => {
  const { setLoading } = props;
  const params = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    product_images: [],
    product_price: "",
    product_type: "",
  });

  useEffect(() => {
    getProductDetailsData();
  }, []);

  const getProductDetailsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/product/get-specific-products/${params.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            const userFields = [
              "title",
              "product_price",
              "description",
              "product_type",
              "product_images",
            ];
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

  return (
    <>
      <div className="nk-content">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="card">
                  <div className="card-aside-wrap">
                    <div className="card-inner card-inner-lg">
                      <div className="nk-block-head">
                        <div className="nk-block-between d-flex justify-content-between">
                          <div className="nk-block-head-content">
                            <h4 className="nk-block-title">Product Details</h4>
                            <div className="nk-block-des"></div>
                          </div>
                          <div className="d-flex align-center">
                            <div className="nk-tab-actions me-n1">
                              {/* <a
                                className="btn btn-icon btn-trigger"
                                data-bs-toggle="modal"
                                href="#profile-edit"
                              >
                                <em className="icon ni ni-edit"></em>
                              </a> */}
                            </div>
                            <div className="nk-block-head-content align-self-start d-lg-none">
                              <a
                                className="toggle btn btn-icon btn-trigger"
                                data-target="userAside"
                              >
                                <em className="icon ni ni-menu-alt-r"></em>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="nk-block">
                        <div className="nk-data data-list">
                          <div className="data-head">
                            <h6 className="overline-title">Basics</h6>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Product Title</span>
                              <span className="data-value">
                                {product?.title}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Sales Price</span>
                              <span className="data-value">
                                {product?.product_price}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Product Type</span>
                              <span className="data-value">
                                {product?.product_type}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Description</span>
                              <span className="data-value">
                                {product?.description}
                              </span>
                            </div>
                          </div>
                          <div className="data-item product_details_image">
                            <div className="data-col">
                              <span className="data-label">Product Images</span>
                              {product.product_images &&
                                product.product_images.length > 0 &&
                                product.product_images.map((image: any) => (
                                  <span className="data-value">
                                    <img
                                      src={`${process.env.REACT_APP_BASEURL}/${image.image_path}`}
                                      alt=""
                                      className="thumb"
                                    />
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <EditProfile /> */}
    </>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(ViewProduct));
