import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const NotificationDetails = (props: MyComponentProps) => {
  const [notification, setNotifaction] = useState<any>({});
  const [coordinator, setCoordinator] = useState<any>({});
  const [quotation, setQuotation] = useState<any>({});

  const { setLoading } = props;
  const params = useParams();

  useEffect(() => {
    getSpecificNotification();
  }, [params]);

  const getSpecificNotification = async () => {
    setLoading(true);
    await authAxios()
      .get(`/notification/get-specific-unseen-notfications/${params.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            console.log(response.data);
            const resData = response.data.data;
            setNotifaction(response.data.data);
            if (resData.type === "CREATE_QUOTE") {
              setCoordinator(resData?.quote_id?.coordinator);
              setQuotation(resData?.quote_id);
            }
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
  console.log("notificationsDetails_Admin", notification);

  return (
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
                          <h4 className="nk-block-title">
                            Notification Details
                          </h4>
                          <div className="nk-block-des"></div>
                        </div>
                        <div className="d-flex align-center">
                          <div className="nk-tab-actions me-n1"></div>
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
                          <h6 className="overline-title">User Details</h6>
                        </div>
                        <div className="data-item">
                          <div className="data-col">
                            <span className="data-label">Name</span>
                            <span className="data-value">
                              {notification?.user?.name}
                            </span>
                          </div>
                        </div>
                        <div className="data-item">
                          <div className="data-col">
                            <span className="data-label">Phone</span>
                            <span className="data-value">
                              {notification?.user?.mobile}
                            </span>
                          </div>
                        </div>
                      </div>
                      {notification.type === "CREATE_QUOTE" && (
                        <div className="nk-data">
                          <div className="data-head">
                            <h6 className="overline-title">
                              Coordinator details
                            </h6>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Coordinator name
                              </span>
                              <span className="data-value">
                                {coordinator?.name}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Coordinator email
                              </span>
                              <span className="data-value">
                                {coordinator?.email}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Coordinator cell number
                              </span>
                              <span className="data-value">
                                {coordinator?.cellNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {notification.type === "CREATE_QUOTE" && (
                        <div className="nk-data">
                          <div className="data-head">
                            <h6 className="overline-title">
                              Quotation details
                            </h6>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Quotation type</span>
                              <span className="data-value">
                                {notification?.quote_type}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Max workers</span>
                              <span className="data-value">
                                {quotation?.maxWorkers}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Weekly hours</span>
                              <span className="data-value">
                                {quotation?.weeklyHours}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Service charge</span>
                              <span className="data-value">
                                {quotation?.serviceCharge}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Delivered price
                              </span>
                              <span className="data-value">
                                {quotation?.deliveredPrice}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Distance from kelowna
                              </span>
                              <span className="data-value">
                                {quotation?.distanceFromKelowna}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Units number</span>
                              <span className="data-value">
                                {quotation?.numUnits}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                special requirements
                              </span>
                              <span className="data-value">
                                {quotation?.special_requirements}
                              </span>
                            </div>
                          </div>

                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                              Use at night
                              </span>
                              <span className="data-value">
                                {quotation?.useAtNight ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </div>

                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                              use in winter
                              </span>
                              <span className="data-value">
                                {quotation?.useInWinter ? 'Yes' : 'No'}
                              </span>
                            </div>
                          </div>
                          
                        </div>
                      )}

                      {notification.type !== "CREATE_QUOTE" && (
                        <div className="nk-data">
                          <div className="data-head">
                            <h6 className="overline-title">Product</h6>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Order Status</span>
                              <span className="data-value text-capitalize">
                                {notification?.order?.status}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">Total Products</span>
                              <span className="data-value">
                                {notification?.order?.products &&
                                  notification.order.products.length}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Total Products Price
                              </span>
                              <span className="data-value">
                                ${notification?.order?.total_price}
                              </span>
                            </div>
                          </div>
                          <div className="data-item">
                            <div className="data-col">
                              <span className="data-label">
                                Delivery Address
                              </span>
                              <span className="data-value">
                                {notification?.order?.address}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsLoadingHOC(IsLoggedinHOC(NotificationDetails));
