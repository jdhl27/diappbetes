import React from "react";
import "./styles.css";

function Input({
  type = "text",
  placeholder = "",
  autofocus = false,
  autocomplete = "true",
  required = true,
  label = "",
}) {
  return (
    <div className="container-field">
      <label className="label">{label}</label>
      <input
        type={type}
        name=""
        id=""
        placeholder={placeholder}
        className="input"
        autoFocus={autofocus}
        autoComplete={autocomplete}
        required={required}
      />
    </div>
  );
}

export default Input;