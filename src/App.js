import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import CssGridPart2 from "./CssGridPart2";
import WebAudioAPI from "./WebAudioAPI";

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

      <CssGridPart2 />
    </div>
  );
}

export default App;
