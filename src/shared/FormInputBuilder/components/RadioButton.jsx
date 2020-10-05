import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButton = ({ handler, formState, meta: { label, options } }) => {
    const availableOptions = options.map((option) => (
        <FormControlLabel
            key={option.key}
            control={<Radio value={option.key} label={option.value} {...handler('radio', option.key)} />}
            label={option.value}
        />
    ));
    return (
        <RadioGroup value={formState}>
            <FormLabel component="legend">{label}</FormLabel>
            {availableOptions}
        </RadioGroup>
    );
};

export default RadioButton;
