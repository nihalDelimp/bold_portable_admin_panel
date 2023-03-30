import  { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client';

import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import IsLoggedinHOC from "./../Common/IsLoggedInHOC";
const socket = io('http://localhost:4000');

const Notification = () => {
    const[newOrder ,setNewOrder]= useState<any>([])
    const[userName ,setuserName]= useState<String>("")
    const[hoursAgo ,setHoursAgo]= useState<any>(null)

    useEffect(()=>{
        socket.on('new_order_recieved',(recieved_order)=>{
            setNewOrder(recieved_order);
            getCustomerDetailsData(recieved_order.user);
        })
      },[])
      
     const getCustomerDetailsData=  useCallback(async (userId:any) => {
        console.log(userId)
        await authAxios()
          .get(`/auth/get-specific-user/${userId}`)
          .then(
            (response) => {
              if (response.data.status === 1) {
                const resData = response.data.data;
                console.log(resData,"resDataresDataresDataresData")
                setuserName(resData.name)
              }
            },
            (error) => {
              toast.error(error.response.data.message);
            }
          )
          .catch((error) => {
            console.log("errorrrr", error);
          });
      }, [newOrder]);
      console.log(userName,"1userNameuserNameuserName")

      
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
                      <span className="sub-title nk-dropdown-title">
                        Notifications
                      </span>
                      <a href="#">Mark All as Read</a>
                    </div>
  
                    <div  className="dropdown-body">
                        <div className="nk-notification">
                            <div className="nk-notification-item dropdown-inner">
                            {userName &&
                            <div className="nk-notification-icon">
                                <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                            </div>
                            }
                            <div className="nk-notification-content">
                                <div className="nk-notification-text">
                                {userName && `${userName} has Placed an order`} 
                                {/* You have requested to <span>{request.type}</span> */}
                                </div>
                                <div className="nk-notification-time">
                            <span>{hoursAgo && "Hours Ago"}</span> 
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="dropdown-foot center">
                      <a href="#">View All</a>
                    </div>
                  </div>
                </li>
  )
}

export default Notification