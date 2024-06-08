import React, { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import logo from "./assets/logo.png";
const Loader = (props) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#264653");

  return (
    <div className="loadingPage">
      <div>
        <div className="loader">
          <RingLoader
            color={color}
            loading={props.load}
            size={160}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div>
          <h2>{props.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
