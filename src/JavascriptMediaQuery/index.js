import React, { useEffect } from "react";

const JavascriptMediaQuery = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width):500px");
    console.log("mediaQuery=", mediaQuery);
    const handleChange = (e) => {
      console.log("change width", e);
      if (e.matches) {
        console.log("media query matched!");
      }
    };

    mediaQuery.addEventListener("change", handleChange, false);
    return () => {
      mediaQuery.removeEventListener("change", handleChange, false);
    };
  }, []);
  return <div>JavascriptMediaQuery</div>;
};

export default JavascriptMediaQuery;

// mediaQuery :{media: "not all", matches: false, onchange: null}
