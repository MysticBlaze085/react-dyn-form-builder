import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectBox = ({ handler, meta: { label, options } }) => {
    const availableOptions = options.map((option) => (
        <MenuItem key={option.key} value={option.key}>
            {option.value}
        </MenuItem>
    ));
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select style={{ width: '100%' }} {...handler()}>
                <MenuItem value="">
                    <em>Select</em>
                </MenuItem>
                {availableOptions}
            </Select>
        </FormControl>
    );
};
export default SelectBox;
