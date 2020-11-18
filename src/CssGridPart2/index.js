import React from 'react';

import './style.css';
import backgroud from './backgroud.jpg';
// import { doRunBuild, cancelRunBuild } from "./client";
import RunBuildOld from './client';
import RunBuild from './client-socket';
let newBuildIdWin;
let newBuildIdMac;
let newBuildId;

const BUILD_MESSAGE = {
  /* build state */
  START_BUILD: 'Starting build',
  CLONE_SOURCE: 'Cloning repository',
  CHECKOUT_AND_BUILD: 'Checkout branch, build app',
  /* new states*/
  CHECKOUT_BRANCH: 'Checking out commit',
  INSTALL_PACKAGES: 'Installing packages',
  UPDATE_ABOUT_FILE: 'Updating ABOUT',
  COMPILE_SASS_CREATE_LANG: 'Compiling SASS & translations',
  BUILD_APP: 'Building electron app',
  /* */
  UPLOAD_FILE: 'Uploading file to remote server',
  BUILD_SUCCESS: 'Build Success',
  TIMEOUT: 'Websocket timed out.',
  CLOSE_CONNECT: 'Websocket connection was closed by the client.',
  /* notifications */
  REGISTER_ID: 'Get build state successfully.',
  CANCEL_SUCCESS: 'Build canceled successfully.',
  CANCEL_FAILED: 'Unable to cancel build.',
  GET_STATE_SUCCESS: 'Get build state successfully.',
  GET_STATE_FAILED: 'Get build state failed.',
  NOT_FOUND_ACTION: 'The requested action was not found.',
  /* build  error */
  ERROR_CONNECT: 'Websocket was errCode.',
  ERROR_BUILDER: 'Builder was error in build processing.',
  ERROR_BUILDER_UPLOAD: 'The file was fail uploaded.',
  ERROR_BUILDER_INVALID_BRANCH: 'The branch is invalid.',
  ERROR_BUILDER_INVALID_TAG: 'The tag is invalid.',
  ERROR_NON_VPN: 'Non vpn connection',
  ERROR_SERVER_CRASH: 'The connection was turned off by server.',
  ERROR_UNKNOW: 'Unknow from server.',
  /* socket server */
  ERROR_WIN_NOT_READY: 'The win builder is not ready to serve now',
  ERROR_MAC_NOT_READY: 'The mac builder is not ready to serve now',
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
    // if (res.buildPlatform === 'win' && res.code === 'ERROR_BUILDER_UPLOAD') {
    //   const params = {
    //     buildType: "buildTag",
    //     buildInfor: { buildTagVersion: "353", buildTagType: "Test" },
    //     action: "BUILD"
    //   };

    //   botWin.doBuild({ params, buildEvents });
    // }

    // if (res.buildPlatform === 'mac' && res.code === 'BUILD_SUCCESS') {
    //   const params = {
    //     buildType: 'buildBranch',
    //     buildInfor: { buildBranch: 'huynh/release' },
    //     action: 'BUILD',
    //   };

    //   botMac.doBuild({ params, buildEvents });
    // }
  };
  const handleBuildState = (res) => {
    if (res.data && res.buildPlatform === 'win' && res.code === 'REGISTER_ID') {
      newBuildIdWin = res.data;
    }
    if (res.data && res.buildPlatform === 'mac' && res.code === 'REGISTER_ID') {
      newBuildIdMac = res.data;
    }

    console.log(res.message);
  };
  const handleCanceledBuild = (res) => {
    if (res.code === 'CANCEL_SUCCESS') {
      // builder.onClose();
    }

    console.log(res.message);
  };
  const handleError = (res) => {
    console.log(res.message);
  };
  const buildEvents = {
    handleBuildResult,
    handleBuildState,
    handleCanceledBuild,
    handleError,
  };
  const botWin = new RunBuild('bot-win');
  const botMac = new RunBuild('bot-mac');
  const builder = new RunBuildOld();
  const onRunBuild = () => {
    console.log('on click do build');
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

    builder.doBuild({ params, buildEvents });
  };
  const onReturnBuildState = () => {
    const params = {
      buildId: newBuildId,
      action: 'STATE',
    };
    builder.getBuildSate(params);
  };
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
    //   buildInfor: { buildTagVersion: "353", buildTagType: "Test" },
    //   action: "BUILD"
    // };
    botWin.doBuild({ params, buildEvents });
  };

  const onRunCancelWin = () => {
    const params = {
      buildId: newBuildIdWin,
      action: 'CANCEL',
    };
    botWin.cancelBuild(params);
  };

  const onReturnBuildStateWin = () => {
    const params = {
      buildId: newBuildIdWin,
      action: 'STATE',
    };
    botWin.getBuildState(params);
  };

  const onRunBuildMac = () => {
    // const params = {
    //   buildType: 'buildBranch',
    //   buildInfor: { buildBranch: 'huynh/release' },
    //   action: 'BUILD',
    // };
    const params = {
      buildType: 'buildTag',
      buildInfor: { buildTagVersion: '353', buildTagType: 'Test' },
      action: 'BUILD',
    };

    botMac.doBuild({ params, buildEvents });
  };

  const onRunCancelMac = () => {
    const params = {
      buildId: newBuildIdMac,
      action: 'CANCEL',
    };
    botMac.cancelBuild(params);
  };

  const onReturnBuildStateMac = () => {
    const params = {
      buildId: newBuildIdMac,
      action: 'STATE',
    };
    botMac.getBuildState(params);
  };

  return (
    <div className='wrapper'>
      <h1>Test build app</h1>
      <p>Bot Side - apply socket server</p>
      <button onClick={onRunBuildWin}>
        Do Buil On <strong>Win</strong>
      </button>
      <button onClick={onRunCancelWin}>
        Cancel run build <strong>Win</strong>
      </button>
      <button onClick={onReturnBuildStateWin}>
        Return Build State On <strong>Win</strong>
      </button>
      <button onClick={onRunBuildMac}>
        Do Run Build On <strong>Mac</strong>
      </button>
      <button onClick={onRunCancelMac}>
        Cancel run build <strong>Mac</strong>
      </button>
      <button onClick={onReturnBuildStateMac}>
        Return Build State <strong>Mac</strong>{' '}
      </button>
      <p>Bot Side</p>
      <button onClick={onRunBuild}>
        Do Buil On <strong>Win</strong>
      </button>
      <button onClick={onReturnBuildState}>
        Return Build State <strong>Win</strong>{' '}
      </button>
    </div>
  );
};

export default CssGridPart2;
