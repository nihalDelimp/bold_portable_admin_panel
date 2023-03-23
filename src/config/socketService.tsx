import { io } from "socket.io-client";


export const socketService = {
  connect,
};

function connect() {
  return new Promise((resolve, reject) => {
    const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
    if (socket.connected) {
      socket.on("connect", () => {
        resolve(socket);
      });
    } else {
      socket.disconnect();
      reject("Connection Error!!");
    }
  });
}
