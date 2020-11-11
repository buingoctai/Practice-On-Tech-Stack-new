import React from "react";

import "./style.css";
import backgroud from "./backgroud.jpg";
// import { doRunBuild, cancelRunBuild } from "./client";
import RunBuildOld from "./client";
import RunBuild from "./client-socket";
let newBuildIdWin;
let newBuildIdMac;
let newBuildId;

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
const CssGridPart2 = () => {
  // const msg = new Msg({
  //   decryptKey: 'decryptKey',
  //   sessionKey: 'sessionKey',
  //   zpwVersion: 'cookies.ZPW_VERSION',
  //   zpwType: 'cookies.ZPW_TYPE',
  // });
  const handleBuildResult = (res) => {
    console.log(res.message);
  }
  const handleBuildState = (res) => {
    if (res.data && res.buildPlatform === 'win') {
      newBuildIdWin = res.data
    };
    if (res.data && res.buildPlatform === 'mac') {
      newBuildIdMac = res.data
    };
    console.log(res.message);
  }
  const handleCanceledBuild = (res) => {
    if (res.code === 'CANCEL_SUCCESS') {
      // builder.onClose();
    }

    console.log(res.message);
  }
  const handleError = (res) => {
    console.log(res.message);
  }
  const buildEvents = { handleBuildResult, handleBuildState, handleCanceledBuild, handleError };
  const botWin = new RunBuild(buildEvents, 'bot-win');
  const botMac = new RunBuild(buildEvents, 'bot-mac');
  const builder = new RunBuildOld();
  const onRunBuild = () => {
    console.log("on click do build");
    const params = {
      buildType: "buildBranch",
      buildInfor: { buildBranch: "ta/card_2011" },
      action: "BUILD"
    };
    // const params = {
    //   buildType: "buildTag",
    //   buildInfor: { buildTagVersion: "353", buildTagType: "test" },
    //   action: "BUILD"
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
  // const onRunCancel = () => {
  //   const params = {
  //     buildId: newBuildId,
  //     action: "CANCEL"
  //   }
  //   builder.cancelBuild(params);
  // }

  //------------------------------------


  // ------------- connect socket ----------------------------
  const onRunBuildWin = () => {
    const params = {
      buildType: 'buildBranch',
      buildInfor: { buildBranch: 'ta/card_2011' },
      action: 'BUILD',
    };
    // const params = {
    //   buildType: "buildTag",
    //   buildInfor: { buildTagVersion: "353", buildTagType: "test" },
    //   action: "BUILD"
    // };
    botWin.doBuild(params);
  }

  const onReturnBuildStateWin = () => {
    const params = {
      buildId: newBuildIdWin,
      action: 'STATE',
    }
    botWin.getBuildState(params);
  }

  const onRunBuildMac = () => {
    const params = {
      buildType: 'buildBranch',
      buildInfor: { buildBranch: 'huynh/release' },
      action: 'BUILD',
    };
    // const params = {
    //   buildType: "buildTag",
    //   buildInfor: { buildTagVersion: "353", buildTagType: "test" },
    //   action: "BUILD"
    // };
    botMac.doBuild(params);
  }

  const onReturnBuildStateMac = () => {
    const params = {
      buildId: newBuildIdMac,
      action: 'STATE',
    }
    botMac.getBuildState(params);
  }


  return <div className="wrapper">
    <h1>Test build app</h1>
    <p>Bot Side - apply socket server</p>
    <button onClick={onRunBuildWin}>Do Buil On <strong>Win</strong></button>
    {/* <button onClick={onRunCancel}>cancel run build</button> */}
    <button onClick={onReturnBuildStateWin}>Return Build State On <strong>Win</strong></button>
    <button onClick={onRunBuildMac}>Do Run Build On <strong>Mac</strong></button>
    {/* <button onClick={onRunCancel}>cancel run build</button> */}
    <button onClick={onReturnBuildStateMac}>Return Build State <strong>Mac</strong> </button>
    <p>Bot Side</p>
    <button onClick={onRunBuild}>Do Buil On <strong>Win</strong></button>
    <button onClick={onReturnBuildState}>Return Build State <strong>Win</strong> </button>

  </div>
};

export default CssGridPart2;
