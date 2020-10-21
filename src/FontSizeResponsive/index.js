import React from "react";
import "./style.css";



const FontSizeResponsive = () => {
    return (
        <section className="wrapper">
            <h2 className="title">Sample Section</h2>
            <p>
                This card uses a relatively simple CSS calculation to rescale <code>margin</code>, <code>padding</code>, <code>font-size</code>, and <code>border-radius</code> between a minimum and maximum size based on screen width.
  </p><p>
                No LESS/SASS/SCSS rubbish, no NPM package trash, just flipping do it with <code>calc</code>, <code>min</code>, <code>max</code> and some native CSS variables.
  </p>
        </section>
    );
}

export default FontSizeResponsive;
