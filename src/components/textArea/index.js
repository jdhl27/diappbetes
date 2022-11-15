import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Microphone as MicrophoneIcon } from "../../icons/microphone";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { Notify } from "../notify";

export default function TextAreaComponent({
  type = "text",
  placeholder = "",
  autofocus = false,
  autocomplete = "true",
  required = true,
  label = "",
  onchange = function () {},
  onchangeVoice = function () {},
  value = "",
}) {
  const [recording, setRecording] = React.useState(false);
  // eslint-disable-next-line no-undef
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "es-ES";

  recognition.onresult = (event) => {
    setRecording(false);
    for (const result of event.results) {
      onchangeVoice(result[0].transcript);
    }
  };

  recognition.onerror = (error) => {
    if (error.error === "not-allowed") {
      Notify("Recuerda dar el permiso del micrófono a Diappbetes", "error");
    } else {
      Notify("Ocurrió un error grabando, intenta escribiendo", "error");
    }
  };

  return (
    <div className="container-field">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <label className="label">{label}</label>
        <Link
          onClick={() => {
            setRecording(true);
            recognition.start();
          }}
          sx={{ cursor: "pointer", display: "flex" }}
        >
          <MicrophoneIcon
            fontSize="small"
            color={recognition ? "red" : "#000"}
          />
        </Link>
      </Box>
      <TextareaAutosize
        value={value}
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
