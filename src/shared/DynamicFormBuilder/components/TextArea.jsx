import * as React from "react";
import TextField from '@material-ui/core/TextField';

const TextArea = ({ handler, meta: {label, placeholder, classes} }) => {
  return (
    <div>
      <div>
        <label>{label}:</label>
      </div>
      <div>
        <TextField multiline fullWidth inputProps={{className: classes.textarea}} placeholder={placeholder} {...handler()} />
      </div>
    </div>
  )
};

export default TextArea;
