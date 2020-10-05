import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectBox = ({ handler, meta: { label, items } }) => {
    const availableItems = items.map((item) => (
        <MenuItem key={item.key} value={item.key}>
            {item.value}
        </MenuItem>
    ));
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select style={{ width: '100%' }} {...handler()}>
                <MenuItem value="">
                    <em>Select</em>
                </MenuItem>
                {availableItems}
            </Select>
        </FormControl>
    );
};
export default SelectBox;
