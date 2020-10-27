
//---------- lib client------------
class RunBuild {
  constructor() {
    this.socket = null;
  }
  doBuild(params) {
    this.socket = new WebSocket("ws://localhost:80", ["json", "xml"]);
    this.socket.addEventListener("open", () => { // đã kết nối thành  công và sẵn sàng cho giao tiếp
      console.log("params=", params);
      this.socket.send(JSON.stringify(params));
    });

    return new Promise((resolve, reject) => {
      // Fire message event when incomming message
      this.socket.addEventListener("message", (event) => {
        const { isCanceled, isError, message, ...restParams } = JSON.parse(event.data);

        if (isCanceled) return;
        if (isError) {
          return reject(message);
        }
        resolve({ message, ...restParams });
      });
      // Fire error event when connecting to websocket error
      this.socket.addEventListener("error", (event) => {
        console.log("event error=");
        reject(event.message);
      });
      // Fire close event when call close() function or auto calling after error event
      // Closing and closed
      this.socket.addEventListener("close", (event) => {
        console.log("Close ket noi");
      });
    });
  }
  cancelBuild(params) {
    if (!this.socket) return;
    this.socket.send(JSON.stringify(params));
    return new Promise((resolve, reject) => {
      this.socket.addEventListener("message", (event) => {
        const { isError, message } = JSON.parse(event.data);
        if (isError) {
          return reject(message);
        }
        resolve(message);
      });
    });
  }
  onClose() {
    if (!this.socket) return;
    this.socket.close();
  }

}

export default RunBuild;
