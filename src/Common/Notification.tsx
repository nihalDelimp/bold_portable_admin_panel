import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { addNewOrderMsg } from "../Redux/Reducers/notificationSlice";
import IsLoadingHOC from "./IsLoadingHOC";
import io, { Socket } from "socket.io-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const Notification = (props: MyComponentProps) => {
  const { setLoading } = props;
  const [allNotifucations, setAllNotifications] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const dispatch = useDispatch();
  const socket = useRef<Socket>();
  const { newOrdersMsg } = useSelector(
    (state: RootState) => state.notification
  );

  console.log("AllNotification", allNotifucations);
  console.log("TotalCont", totalCount);

  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("new_order_recieved", (recieved_order) => {
        console.log("recieved_order", recieved_order);
        // dispatch(addNewOrderMsg(recieved_order));
        getAllNotifications();
      });
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    await authAxios()
      .get(`/notification/get-all-unseen-notfications`)
      .then(
        (response) => {
          if (response.data.status === 1) {
            const resData = response.data.data;
            setTotalCount(response.data?.count);
            console.log("Notifications_resData", resData);
            setAllNotifications(resData);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const markAllNotificationsSeen = async () => {
    setLoading(true);
    await authAxios()
      .put(`/notification/mark-all-notfications-true`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            console.log("MarkReadALlNotifications_resData", resData);
            getAllNotifications();
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

  const markSpecificNotificationSeen = async (_id: string) => {
    setLoading(true);
    await authAxios()
      .patch(`/notification/${_id}/mark-specific-notification-as-seen`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            getAllNotifications();
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

  console.log("OrderNotification", newOrdersMsg);

  return (
    <li className="dropdown notification-dropdown">
      <a
        href="#"
        className="dropdown-toggle nk-quick-nav-icon"
        data-bs-toggle="dropdown"
      >
        <div
          className={
            allNotifucations && allNotifucations.length > 0
              ? "icon-status icon-status-info"
              : ""
          }
        >
          <em className="icon ni ni-bell"></em>
        </div>
      </a>
      <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">Notifications</span>
          <a href="#" onClick={markAllNotificationsSeen}>{allNotifucations.length > 0 && "Mark All as Read"}</a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {allNotifucations &&
              allNotifucations.length > 0 &&
              allNotifucations.map((item: any, index: number) => {
                if (!item.status_seen) {
                  return (
                    <div
                      key={index + 1}
                      className="nk-notification-item dropdown-inner"
                      style={{padding: "20px 10px 20px"}}
                    >
                       <div className="nk-notification-icon">
                       <em className="icon icon-circle bg-info-dim ni ni-cart"></em>
                    </div>
                      <Link to={`/notification-details/${item._id}`}>
                      <div className="nk-notification-content">
                        <div className="nk-notification-text">
                          {`${item?.user?.name} has Placed ${item?.order?.products?.length} order`}
                        </div>
                        <div className="nk-notification-time">
                          <span>{dayjs(item.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      </Link>
                      <a style={{marginLeft:"auto"}}
                          onClick={() => markSpecificNotificationSeen(item._id)}
                        >
                       <div className="nk-notification-icon">

                          <em className="icon icon-circle bg-success-dim ni ni-check-circle"></em>
                          </div>
                        </a>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#">View All</a>
        </div>
      </div>
    </li>
  );
};

export default IsLoadingHOC(Notification);
