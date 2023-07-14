import React from "react";
import { ToastContainer } from "react-toastify";
import RootRouter from "./RootRouter";

console.log("Worked on Gallery box")

function App() {
  return (
    <div className="nk-app-root">
      <div className="nk-main">
        <RootRouter />
        <ToastContainer autoClose={6000} position="top-right" />
      </div>
    </div>
  );
}

export default App;
