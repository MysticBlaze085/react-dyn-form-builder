import * as React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckBox = ({ handler }) => {
  return(
  <div>
   <FormGroup row>
      <FormControlLabel
        control={<Checkbox />}
      />
      </FormGroup>
  </div>
)};

export default CheckBox;