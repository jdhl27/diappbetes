import React from "react";
import "./styles.css";

function ButtonComponent({text = "", href = "#"}) {
  return (
    <a href={href} className="button">
      {text}
    </a>
  );
}

export default ButtonComponent;
