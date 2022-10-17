import React from "react";
import "./styles.css";

function ButtonComponent({ text = "", href = "#", onClick = null }) {
  if (onClick) {
    return (
      <div className="button" onClick={() => onClick()}>
        {text}
      </div>
    );
  }
  return (
    <a href={href} className="button">
      {text}
    </a>
  );
}

export default ButtonComponent;
