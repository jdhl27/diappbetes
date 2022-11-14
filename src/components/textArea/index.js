import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function TextAreaComponent({
  type = "text",
  placeholder = "",
  autofocus = false,
  autocomplete = "true",
  required = true,
  label = "",
  onchange = function () {},
}) {
  return (
    <div className="container-field">
      <label className="label">{label}</label>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={5}
        maxRows={10}
        placeholder={placeholder}
        onChange={(e) => onchange(e.target.value)}
        autoFocus={autofocus}
        autoComplete={autocomplete}
        required={required}
        typeof={type}
        className="textArea"
      />
    </div>
  );
}
