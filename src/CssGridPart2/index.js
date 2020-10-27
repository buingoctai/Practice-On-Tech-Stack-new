import React from "react";
import "./style.css";
import backgroud from "./backgroud.jpg";
// import { doRunBuild, cancelRunBuild } from "./client";
import RunBuild from "./client";

let newPid;
const CssGridPart2 = () => {
  // const msg = new Msg({
  //   decryptKey: 'decryptKey',
  //   sessionKey: 'sessionKey',
  //   zpwVersion: 'cookies.ZPW_VERSION',
  //   zpwType: 'cookies.ZPW_TYPE',
  // });

  const builder = new RunBuild();
  const onRunBuild = () => {
    console.log("on click");
    const params = {
      buildType: "buildBranch",
      buildInfor: { buildBranch: "features/release_352" },
      token: 'R3YKZFKBVi',
    };

    // const params = {
    //   buildType: "buildTag",
    //   buildInfor: { buildTagVersion: "V101", buildTagType: "new feature" },
    // };
    builder.doBuild(params)
      .then((res) => {
        console.log("res", res);
        const { isFinished, message, pid } = res;
        newPid = pid;
        if (isFinished) {
          builder.onClose();
          console.log(message); // Get download url
        } else {
          console.log(message);  // Get build state
        }
      })
      .catch((err) => {
        builder.onClose();
        console.log("err xxx", err);
      });
  }
  const onCancelBuild = () => {
    const params = {
      // pid: newPid,
      pid: 2002
    }
    builder.cancelBuild(params)
      .then((res) => {
        // Log success cancel noti
        builder.onClose();
        console.log(res);
      })
      .catch((err) => {
        // Log not success cancel noti
        console.log(err);
      });

  }

  return <div className="wrapper">
    <h1>some heading</h1>
    <p>some content and stuff</p>
    <img className="full__bleed" alt="backgroud" src={backgroud} />
    <button onClick={onRunBuild}>do run build</button>
    <button onClick={onCancelBuild}>cancel run build</button>
  </div>
};

export default CssGridPart2;
