import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

const Checkboxs = ({ handler, hasError, meta: { label, items, classes } }) => {
    const availableItems = items.map((item) => (
        <FormControlLabel
            key={item.key}
            control={<Checkbox value={item.key} label={item.value} {...handler('checkbox')} />}
            label={item.value}
        />
    ));
    return (
        <div style={{ width: '100%' }}>
            <FormControl component="fieldset" className={classes}>
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>{availableItems}</FormGroup>
                {/* <FormHelperText>{isValid ? `${label} is required` : null}</FormHelperText> */}
            </FormControl>
        </div>
    );
};

export default Checkboxs;
