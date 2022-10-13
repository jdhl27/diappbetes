import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Links({ text = "", href = "#", isLink = false }) {
  if (isLink) {
    return (
      <Link to = {href} className="link">
        {text}
      </Link>
    );
  }
  return (
    <a href={href} className="link">
      {text}
    </a>
  );
}

export default Links;
