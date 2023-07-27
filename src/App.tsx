import React from "react";
import { ToastContainer } from "react-toastify";
import RootRouter from "./RootRouter";

console.log('toggle testing added refresh 2')

function App() {
  return (
    <div className="nk-app-root">
      <div className="nk-main">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <RootRouter />
        <ToastContainer autoClose={6000} position="top-right" />
      </div>
    </div>
  );
}

export default App;
