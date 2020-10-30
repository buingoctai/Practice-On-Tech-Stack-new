
//---------- lib client------------
class RunBuild {
  constructor() {
    this.socket = null;
  }
  doBuild({ params, buildEvents }) {
    this.socket = new WebSocket("ws://localhost:80", ["json", "xml"]);
    this.socket.addEventListener("open", () => { // đã kết nối thành  công và sẵn sàng cho giao tiếp
      console.log("params=", params);
      this.socket.send(JSON.stringify(params));
    });
    const { handleBuildResult, handleBuildSate, handleCanceledBuild, handleError } = buildEvents;
    this.socket.addEventListener("message", (event) => {
      console.log("----------event.data", JSON.parse(event.data));
      const { action, ...restRes } = JSON.parse(event.data);
      // Includes: action, message, code
      switch (action) {
        case 'BUILD':
          handleBuildResult(restRes);
          break;
        case 'STATE':
          handleBuildSate(restRes);
          break;
        case 'CANCEL':
          handleCanceledBuild(restRes);
          break;
        case 'ERROR':
          handleError(restRes);
          this.onClose();
          break;
        default:
          console.log(restRes.message);
      }

    });
    // Fire error event when connecting to websocket error
    this.socket.addEventListener("error", (event) => {
      const code = event.message ? 'ERROR_CONNECT' : 'ERROR_SERVER_CRASH';
      handleError({ message: event.message, code });
      this.onClose();
    });
    // Fire close event when call close() function or auto calling after error event
    // Closing and closed
    this.socket.addEventListener("close", (event) => {
      console.log("Connection was closed");
    });
  }
  cancelBuild(params) {
    if (!this.socket) return;
    this.socket.send(JSON.stringify(params));
  }
  getBuildSate(params) {
    if (!this.socket) return;
    this.socket.send(JSON.stringify(params));
  }
  onClose() {
    if (!this.socket) return;
    this.socket.close();
  }

}

export default RunBuild;
