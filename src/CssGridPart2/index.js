import React from "react";
import "./style.css";
import backgroud from "./backgroud.jpg";
// import { doRunBuild, cancelRunBuild } from "./client";
import RunBuild from "./client";

const CssGridPart2 = () => {
  const msg = new Msg({
    decryptKey: 'decryptKey',
    sessionKey: 'sessionKey',
    zpwVersion: 'cookies.ZPW_VERSION',
    zpwType: 'cookies.ZPW_TYPE',
  });

  console.log("msg", msg);

  const builder = new RunBuild();
  const onRunBuild = () => {
    console.log("on click");
    const params = {
      buildType: "buildBranch",
      buildInfor: { buildBranch: "features/release_352" },
      token: 'R3YKZFKBVi'
    };

    // const params = {
    //   buildType: "buildTag",
    //   buildInfor: { buildTagVersion: "V101", buildTagType: "new feature" },
    // };
    builder.doRunBuild(params)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err xxx", err);
      });

  }
  const onCancelBuild = () => {

    builder.cancelRunBuild();
  }
  const onSendMsg = () => {
    msg.sendText({});
  }
  return <div className="wrapper">
    <h1>some heading</h1>
    <p>some content and stuff</p>
    <img className="full__bleed" alt="backgroud" src={backgroud} />
    <button onClick={onRunBuild}>do run build</button>
    <button onClick={onCancelBuild}>cancel run build</button>
    <button onClick={onSendMsg}>send msg</button>
  </div>
};

export default CssGridPart2;
