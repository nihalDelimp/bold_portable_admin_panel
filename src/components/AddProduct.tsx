import React, { useState , useRef } from "react";
import { authAxios } from "../Config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete
} from "@react-google-maps/api";


interface MyComponentProps {
  getProductsListData: () => void;
}

interface MyState {
  title: string;
  description: string;
  product_images: any[];
  product_price: number;
  product_type: string;
}

const AddProduct = (props: MyComponentProps) => {
  const navigate = useNavigate();
  const { getProductsListData } = props;
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef();

  const [autocomplete, setAutocomplete] = useState<Autocomplete | null>(null);


  const [product, setProduct] = useState<MyState>({
    title: "",
    description: "",
    product_images: [],
    product_price: 0,
    product_type: "",
  });


  const { isLoaded  ,loadError } = useJsApiLoader(
    {
         id: 'google-map-script',
         googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        libraries: ["places"],
    }
);

function handleLoad(maps : any) {
    setMap(maps);
}

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    product.product_images.forEach((file) => {
      formData.append(`product_image`, file);
    });

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("product_price", product.product_price.toString());
    formData.append("product_type", product.product_type);
    await authAxios()
      .post("/product/add-products", formData)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success(response.data.message);
            navigate("/products");
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
        console.log("errorr", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "product_price") {
      setProduct((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    const files = e.target.files;
    if (!files) {
      return;
    }
    console.log("files", files);
    setProduct((prev) => ({
      ...prev,
      [name]: files,
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
                  <label className="form-label">Title</label>
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
                  <label className="form-label">Type</label>
                  <div className="form-control-wrap">
                    <input
                      required
                      className="form-control"
                      value={product.product_type}
                      name="product_type"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter product type"
                      id="sale-price"
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
                      min={0}
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
                      rows={2}
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
                      multiple
                      type="file"
                      name="product_images"
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
              </div>
              <div className="dz-preview dz-processing dz-error dz-complete dz-image-preview">
                {" "}
                <div className="dz-image">
                  <img data-dz-thumbnail="" alt="founder2.png" />
                  <span></span>
                </div>
                <div className="dz-success-mark">
                  {" "}
                  <svg
                    width="54px"
                    height="54px"
                    viewBox="0 0 54 54"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <title>Check</title>{" "}
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <path
                        d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
                        stroke-opacity="0.198794158"
                        stroke="#747474"
                        fill-opacity="0.816519475"
                        fill="#FFFFFF"
                      ></path>{" "}
                    </g>{" "}
                  </svg>{" "}
                </div>{" "}
                <div className="dz-error-mark">
                  {" "}
                  <svg
                    width="54px"
                    height="54px"
                    viewBox="0 0 54 54"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                   
                  >
                    {" "}
                    <title>Error</title>{" "}
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        stroke="#747474"
                        stroke-opacity="0.198794158"
                        fill="#FFFFFF"
                        fill-opacity="0.816519475"
                      >
                        {" "}
                        <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </svg>{" "}
                </div>{" "}
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
