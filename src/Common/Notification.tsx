import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { addNewOrderMsg } from "../Redux/Reducers/notificationSlice";
import io, { Socket } from "socket.io-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Notification = () => {
  const dispatch = useDispatch();
  const socket = useRef<Socket>();
  const { newOrdersMsg } = useSelector(
    (state: RootState) => state.notification
  );

  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("new_order_recieved", (recieved_order) => {
        console.log("recieved_order", recieved_order);
        getCustomerDetailsData(recieved_order);
      });
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const getCustomerDetailsData = async (orderDetail: any) => {
    let placedOrder = orderDetail;
    console.log(orderDetail);
    await authAxios()
      .get(`/auth/get-specific-user/${orderDetail.user}`)
      .then(
        (response) => {
          if (response.data.status === 1) {
            const resData = response.data.data;
            console.log(resData, "resDataresDataresDataresData");
            placedOrder["userName"] = resData.name;
            dispatch(addNewOrderMsg(placedOrder));
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

  console.log("OrderNotification", newOrdersMsg);

  return (
    <li className="dropdown notification-dropdown">
      <a
        href="#"
        className="dropdown-toggle nk-quick-nav-icon"
        data-bs-toggle="dropdown"
      >
        <div className="icon-status icon-status-info">
          <em className="icon ni ni-bell"></em>
        </div>
      </a>
      <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">Notifications</span>
          <a href="#">Mark All as Read</a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {newOrdersMsg &&
              newOrdersMsg.length > 0 &&
              newOrdersMsg.slice(0).reverse().map((item: any, index: number) => (
                <div
                  key={index + 1}
                  className="nk-notification-item dropdown-inner"
                >
                  <div className="nk-notification-icon">
                    <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                  </div>
                  <div className="nk-notification-content">
                    <div className="nk-notification-text">
                      {`${item?.userName} has Placed an order`}
                    </div>
                    <div className="nk-notification-time">
                      <span>{dayjs(item.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#">View All</a>
        </div>
      </div>
    </li>
  );
};

export default Notification;
