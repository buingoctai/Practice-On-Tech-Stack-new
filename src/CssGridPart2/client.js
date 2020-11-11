
//---------- lib client------------
const BUILD_MESSAGE = {
  /* build state */
  START_BUILD: 'Start run build',
  CLONE_SOURCE: 'Clone zalo pc code',
  CHECKOUT_AND_BUILD: 'Checkout branch, build app',
  /* new states*/
  CHECKOUT_BRANCH: 'Checkout source branch',
  INSTALL_PACKAGES: 'Install packages',
  UPDATE_ABOUT_FILE: 'Update about file',
  COMPILE_SASS_CREATE_LANG: 'Compile sass to css, create language',
  BUILD_APP: 'Build electron app',
  /* */
  UPLOAD_FILE: 'Upload file',
  BUILD_SUCCESS: 'Build was success',
  TIMEOUT: 'Websocket timed out',
  CLOSE_CONNECT: 'Websocket connection was closed by the client',
  /* notifications */
  REGISTER_ID: 'Get build state successfully',
  CANCEL_SUCCESS: 'Build Processing was cancel successfully.',
  CANCEL_FAILED: 'Build Processing was failed cancel',
  GET_STATE_SUCCESS: 'Get build state successfully',
  GET_STATE_FAILED: 'Get build state falied',
  NOT_FOUND_ACTION: 'The requested action was not found', // ngoại lệ k gắn action type
  /* build  error */
  ERROR_CONNECT: 'Websocket was errCode',
  ERROR_BUILDER: 'Builder was error in build processing',
  ERROR_BUILDER_UPLOAD: "The file was fail uploaded",
  ERROR_BUILDER_INVALID_BRANCH: 'The branch is invalid',
  ERROR_SERVER_CRASH: 'The connection was turned off by server',
  ERROR_UNKNOW: 'Unknow from server'
};
class RunBuildOld {
  constructor() {
    this.socket = null;
  }
  doBuild({ params, buildEvents }) {
    this.socket = new WebSocket("ws://localhost:80", ["json", "xml"]);
    this.socket.addEventListener("open", () => { // đã kết nối thành  công và sẵn sàng cho giao tiếp
      console.log("params=", params);
      this.socket.send(JSON.stringify(params));
    });
    const { handleBuildResult, handleBuildState, handleCanceledBuild, handleError } = buildEvents;
    this.socket.addEventListener("message", (event) => {
      console.log("----------event.data", JSON.parse(event.data));
      const { action, ...restRes } = JSON.parse(event.data);
      // Includes: action, message, code
      switch (action) {
        case 'BUILD':
          // handleBuildResult(restRes);
          break;
        case 'STATE':
          // handleBuildState(restRes);
          break;
        case 'CANCEL':
          // handleCanceledBuild(restRes);
          break;
        case 'ERROR':
          // handleError(restRes);
          this.onClose();
          break;
        default:
          console.log(restRes.message);
        // this.onClose();
      }
    });
    // Fire error event when connecting to websocket error
    this.socket.addEventListener("error", (event) => {
      const code = event.message && 'ERROR_CONNECT' || 'ERROR_SERVER_CRASH';
      const message = event.message || BUILD_MESSAGE[code]
      handleError({ message, code });
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

export default RunBuildOld;
