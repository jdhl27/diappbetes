import React from "react";
import "./styles.css";

function Input({
  type = "text",
  placeholder = "",
  autofocus = false,
  autocomplete = "true",
  required = true,
  label = "",
  onchange = function () {}
}) {
  return (
    <div className="container-field">
      <label className="label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="input"
        autoFocus={autofocus}
        autoComplete={autocomplete}
        required={required}
        onChange={(e) => onchange(e.target.value)}
      />
    </div>
  );
}

export default Input;