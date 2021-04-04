import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import CssGridPart2 from "./CssGridPart2";
import JsAnimationLib from './JsAnimationLib';
import WebAudioAPI from "./WebAudioAPI";
import CssSwitchCaseConditions from './CssSwitchCaseConditions';
import CSSClamp from './CSSClamp';
import CSSHiden from './CSSHiden';
import GetRefChild from './GetRefChild';
import { squareOutput, diagonalOutput } from "./TopLevelAwait/middlewares";
import "./App.css";

function App() {

  // setTimeout(() => {
  //   console.log("squareOutput=", squareOutput);
  //   console.log("diagonalOutput=", diagonalOutput);

  // }, 1000);
  return (
    <div className="App">
      {/* <Helmet>
        <html lang="en" />
        <title>set seo content trong app</title>
        <meta name="description" content="Tutorial for React Helmet" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <ReactHelmet /> */}

      {/* <JsAnimationLib /> */}
      {/* <CssSwitchCaseConditions/> */}
      <GetRefChild/>
    </div>
  );
}

export default App;
