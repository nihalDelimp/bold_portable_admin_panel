import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}
const NotificationDetails = (props: MyComponentProps) => {
  const [notificationsDetails,setNotifactionDetails]=useState<any>({})
  const { setLoading } = props;
  const params = useParams();
  useEffect(()=>{
    getSpecificNotification();
  },[])

  const getSpecificNotification = async () => {
    setLoading(true);
    await authAxios()
      .get(`/notification/get-specific-unseen-notfications/${params.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            console.log(response.data)
            setNotifactionDetails(response.data.data)
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
console.log(notificationsDetails,"notificationsDetailsnotificationsDetailsnotificationsDetails")
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
                        <h4 className="nk-block-title">Notification Details</h4>
                        <div className="nk-block-des"></div>
                      </div>
                      <div className="d-flex align-center">
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
                  {notificationsDetails?.user?.name} has Placed {notificationsDetails?.order?.products?.length} Order.
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default IsLoadingHOC(IsLoggedinHOC(NotificationDetails));
