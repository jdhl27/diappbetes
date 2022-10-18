import React from "react";
import ReactLoading from "react-loading";
import "./styles.css";

const Loading = ({ type = 'spin', color = "#fff" }) => (
  <div className="container-loading">
    <ReactLoading
      type={type}
      color={color}
      height={90}
      width={90}
      className="loading"
    />
  </div>
);

export default Loading;
