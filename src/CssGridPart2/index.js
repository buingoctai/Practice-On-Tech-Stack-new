import React from "react";
import "./style.css";
import backgroud from "./backgroud.jpg";
// import { doRunBuild, cancelRunBuild } from "./client";
import RunBuild from "./client";

let newBuildId;
const BUILD_MESSAGE = {
  START_BUILD: 'Start run build',
  CLONE_SOURCE: 'Clone zalo pc code',
  CHECKOUT_AND_BUILD: 'Checkout branch, build app',
  UPLOAD_FILE: 'Upload file',

  TIMEOUT: 'Websocket timed out',

  CLOSE_CONNECT: 'Websocket connection was closed by the client',
  CANCEL_SUCCESS: 'Build Processing was success cancel',
  BUILD_SUCCESS: 'Build was success',

  /* errors */
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
  const onRunCancel = () => {
    const params = {
      buildId: newBuildId,
      action: "CANCEL"
    }
    builder.cancelBuild(params);
  }
  const onReturnBuildState = () => {
    const params = {
      buildId: newBuildId,
      action: "STATE"
    }
    builder.getBuildSate(params);
  }
  //----------------
  const onProcessingBuild = (params) => {
    if (params.buildId) {
      console.log("onProcessingBuild: ", params.buildId);
      newBuildId = params.buildId;
      return;
    };

    console.log("onProcessingBuild: ", BUILD_MESSAGE[params.code]);
  }
  const onFinishedBuild = (params) => {
    console.log("onFinishedBuild: ", BUILD_MESSAGE[params.code]);
  }
  const onCanceledBuild = (params) => {
    console.log("onCanceledBuild: ", BUILD_MESSAGE[params.code]);
  }
  const onError = (params) => {
    console.log("onError: ", BUILD_MESSAGE[params.code]);
  }
  const buildEvents = { onProcessingBuild, onFinishedBuild, onError, onCanceledBuild };


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
