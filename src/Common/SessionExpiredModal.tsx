import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Reducers/auth";
import { useNavigate } from "react-router-dom";

function SessionExpiredModal() {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const [modal, setModal] = useState<boolean>(true);

  const handleLogout = () => {
    dispatch(logout(false));
    setModal(false);
    navigate('/')
  };

  return (
    <div
      className={`modal fade" ${modal ? "show" : "hide"}`}
      id="modalDefault"
      style={{ display: modal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-top" role="document">
        <div className="modal-content">
          {/* <a  className="close" data-dismiss="modal" aria-label="Close">
            <em className="icon ni ni-cross"></em>
          </a> */}
          <div className="modal-header text-center">
            <h5 className="modal-title w-100">Alert</h5>
          </div>
          <div className="modal-body text-center">
            <p>Your session has been expired. Please try again login</p>
          </div>
          <div className="modal-footer bg-light">
            <button onClick={handleLogout} className="btn btn-warning btn-sm">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionExpiredModal;
