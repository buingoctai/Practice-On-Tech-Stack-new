
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
    const { onProcessingBuild, onFinishedBuild, onError, onCanceledBuild } = buildEvents;
    this.socket.addEventListener("message", (event) => {
      const { isCanceled, isError, isFinished, message, code, buildId } = JSON.parse(event.data);

      if (isCanceled) {
        onCanceledBuild({ message, code });
        this.onClose();
        return;
      };
      if (isError) {
        onError({ message, code });
        this.onClose();
        return;
      }

      if (isFinished) {
        onFinishedBuild({ message, code });
        this.onClose();
      } else {
        onProcessingBuild({ message, code, buildId });
      }
    });
    // Fire error event when connecting to websocket error
    this.socket.addEventListener("error", (event) => {
      const code = event.message ? 'ERROR_CONNECT' : 'ERROR_SERVER_CRASH';
      onError({ message: event.message, code });
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
  onClose() {
    if (!this.socket) return;
    this.socket.close();
  }

}

export default RunBuild;
