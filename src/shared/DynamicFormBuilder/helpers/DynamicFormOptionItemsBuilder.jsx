import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const DynamicFormOptionItemsBuilder = (props) => {
  const {handler, name, type, options} = props;
  switch(type) {
    case 'RadioButtons': {
      const mapRadioInputs = options.map(i => {
      const lowerCaseName = i.toLowerCase();
        return (
          <FormControl component="fieldset">
            <RadioGroup name={name}>
              <FormControlLabel value={i} label={i} control={<Radio {...handler('radio', lowerCaseName)}/>} />
            </RadioGroup>
          </FormControl>
          )
      });
      return mapRadioInputs
    }
    case 'SelectBox': {
      const mapSelectBoxOptions = options.map(i => {
        const lowerCaseNameSelectOption = i.toLowerCase();
        return (
          <option value={lowerCaseNameSelectOption}>{i}</option>
        )
      });
      return mapSelectBoxOptions;
    }
    default: {
      return null
    }
  }
}

export default DynamicFormOptionItemsBuilder;