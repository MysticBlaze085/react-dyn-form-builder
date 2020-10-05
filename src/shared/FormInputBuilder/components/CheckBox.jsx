import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Checkboxs = ({ handler, meta: { label, items } }) => {
    const availableItems = items.map((Item) => (
        <FormControlLabel
            key={Item.key}
            control={<Checkbox value={Item.key} label={Item.value} {...handler('checkbox')} />}
            label={Item.value}
        />
    ));
    return (
        <div style={{ width: '100%' }}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>{availableItems}</FormGroup>
        </div>
    );
};

export default Checkboxs;
