import { socketService } from "../../config/socketService";

export const socketActions = {
  connect,
  disconnect,
};

function connect() {
  socketService
    .connect()
    .then((socket: any) => {
      socket.on("new_order", (data: string) => {
        console.log("new_Oreder_Data", data);
      });

      socket.on("cancel_order", (data: string) => {
        console.log("new_Oreder_Data", data);
      });
    })
    .catch((error: any) => {
      console.log("socket_error", error);
    });
}

function disconnect() {
  socketService.connect().then((socket: any) => {
    socket.disconnect();
  });
}
