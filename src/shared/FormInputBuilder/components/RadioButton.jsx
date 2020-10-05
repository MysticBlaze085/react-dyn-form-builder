import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButton = ({ handler, formState, meta: { label, items } }) => {
    const availableItems = items.map((item) => (
        <FormControlLabel
            key={item.key}
            control={<Radio value={item.key} label={item.value} {...handler('radio', item.key)} />}
            label={item.value}
        />
    ));
    return (
        <RadioGroup value={formState}>
            <FormLabel component="legend">{label}</FormLabel>
            {availableItems}
        </RadioGroup>
    );
};

export default RadioButton;
