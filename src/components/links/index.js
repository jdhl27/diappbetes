import React from "react";
import "./styles.css";

function Links({text = "", href = "#"}) {
  return (
    <a href={href} className="link">
      {text}
    </a>
  );
}

export default Links;