


// export const doRunBuild = (params) => {
// const socket = new WebSocket("ws://localhost:80", ["json", "xml"]);
//   socket.addEventListener("open", () => {
//     console.log("params=", params);
//     socket.send(JSON.stringify(params));
//   });

//   return new Promise((resolve, reject) => {
//     // Fire message event when incomming message
//     socket.addEventListener("message", (event) => {
//       console.log("message incomming", event.data);
//       const { isError, message } = JSON.parse(event.data);

//       if (isError) {
//         reject(message);
//       }
//       resolve(message);
//       socket.close();
//     });
//     // Fire error event when connecting to websocket error
//     socket.addEventListener("error", (event) => {
//       reject(event.message);
//     });
//     // Fire close event when call close() function or auto calling after error event
//     socket.addEventListener("close", (event) => {
//       console.log("Close ket noi");
//     });
//   });
// };


//---------- lib client------------
class RunBuild {
  constructor() {
    this.socket = null;
  }
  doRunBuild(params) {
    this.socket = new WebSocket("ws://localhost:80", ["json", "xml"]);
    this.socket.addEventListener("open", () => {
      console.log("params=", params);
      this.socket.send(JSON.stringify(params));
    });

    return new Promise((resolve, reject) => {
      // Fire message event when incomming message
      this.socket.addEventListener("message", (event) => {
        console.log("message incomming", event.data);
        const { isError, message } = JSON.parse(event.data);

        if (isError) {
          reject(message);
        }
        resolve(message);
        this.socket.close();
      });
      // Fire error event when connecting to websocket error
      this.socket.addEventListener("error", (event) => {
        console.log("event error=");
        reject(event.message);
      });
      // Fire close event when call close() function or auto calling after error event
      this.socket.addEventListener("close", (event) => {
        console.log("Close ket noi");
      });
    });
  }
  cancelRunBuild() {
    if (!this.socket) return;
    this.socket.close();
  }
}

export default RunBuild;
