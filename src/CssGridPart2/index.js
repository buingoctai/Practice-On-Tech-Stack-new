import React from "react";
import "./style.css";
import backgroud from "./backgroud.jpg";
// import { doRunBuild, cancelRunBuild } from "./client";
import RunBuild from "./client";

let newBuildId;
const BUILD_MESSAGE = {
  /* build state */
  START_BUILD: 'Start run build',
  CLONE_SOURCE: 'Clone zalo pc code',
  CHECKOUT_AND_BUILD: 'Checkout branch, build app',
  UPLOAD_FILE: 'Upload file',
  BUILD_SUCCESS: 'Build was success',
  TIMEOUT: 'Websocket timed out',
  CLOSE_CONNECT: 'Websocket connection was closed by the client',
  /* notifications */
  CANCEL_SUCCESS: 'Build Processing was cancel successfully.',
  CANCEL_FAILED: 'Build Processing was failed cancel',
  GET_STATE_SUCCESS: 'Get build state successfully',
  GET_STATE_FAILED: 'Get build state falied',
  NOT_FOUND_ACTION: 'The requested action was not found', // ngoại lệ k gắn action type
  /* build  error */
  ERROR_CONNECT: 'Websocket was errCode',
  ERROR_BUILDER: 'Builder was error in build processing',
  ERROR_SERVER_CRASH: 'The connection was turned off by server',
};
const CssGridPart2 = () => {
  // const msg = new Msg({
  //   decryptKey: 'decryptKey',
  //   sessionKey: 'sessionKey',
  //   zpwVersion: 'cookies.ZPW_VERSION',
  //   zpwType: 'cookies.ZPW_TYPE',
  // });

  const builder = new RunBuild();
  const onRunBuild = () => {
    console.log("on click do build");
    const params = {
      buildType: "buildBranch",
      buildInfor: { buildBranch: "features/release_353" },
      action: "BUILD"
    };
    // const params = {
    //   buildType: "buildTag",
    //   buildInfor: { buildTagVersion: "V101", buildTagType: "new feature" },
    // };

    builder.doBuild({ params, buildEvents });
  }
  const onReturnBuildState = () => {
    const params = {
      buildId: newBuildId,
      action: "STATE"
    }
    builder.getBuildSate(params);
  }
  const onRunCancel = () => {
    const params = {
      buildId: newBuildId,
      action: "CANCEL"
    }
    builder.cancelBuild(params);
  }
  //------------------------------------

  const handleBuildResult = (res) => {
    console.log(res.message);
  }
  const handleBuildSate = (res) => {
    if (res.buildId) {
      newBuildId = res.buildId
    };
    console.log(res.message);
  }
  const handleCanceledBuild = (res) => {
    if (res.code === 'CANCEL_SUCCESS') builder.onClose()
    console.log(res.message);
  }
  const handleError = (res) => {
    console.log(res.message);
  }
  const buildEvents = { handleBuildResult, handleBuildSate, handleCanceledBuild, handleError };


  return <div className="wrapper">
    <h1>some heading</h1>
    <p>some content and stuff</p>
    <img className="full__bleed" alt="backgroud" src={backgroud} />
    <button onClick={onRunBuild}>do run build</button>
    <button onClick={onRunCancel}>cancel run build</button>
    <button onClick={onReturnBuildState}>return build state</button>
  </div>
};

export default CssGridPart2;
