import * as React from "react";
import TextField from '@material-ui/core/TextField';

const TextInput = ({handler, meta: {label, placeholder}}) => 
 { 
   return <div>
      <TextField label={label} placeholder={placeholder} {...handler()} />
    </div>
  };

export default TextInput;
