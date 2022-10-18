import React from "react";
import "./styles.css";

function ButtonComponent({ text = "", href = "#", onClick = null, style = {} }) {
  if (onClick) {
    return (
      <div style={style} className="button" onClick={() => onClick()}>
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
