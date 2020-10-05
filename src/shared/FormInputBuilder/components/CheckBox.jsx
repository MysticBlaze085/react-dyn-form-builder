import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Checkboxs = ({ handler, meta: { label, options } }) => {
    const availableOptions = options.map((option) => (
        <FormControlLabel
            key={option.key}
            control={<Checkbox value={option.key} label={option.value} {...handler('checkbox', option.key)} />}
            label={option.value}
        />
    ));
    return (
        <div>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>{availableOptions}</FormGroup>
        </div>
    );
};

export default Checkboxs;
