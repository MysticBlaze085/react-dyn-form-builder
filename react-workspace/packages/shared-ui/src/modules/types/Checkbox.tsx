import { FormControl, useFormControlContext } from "@mui/base";

import { Checkbox } from "@material-tailwind/react";
import React from "react";

export interface CheckboxProps {
    handler: any;
    meta: {
        item: {
            value: string;
            id: string;
        }
    };
    [key: string]: any; // Allow additional props
}

export const CheckboxDefault: React.FC<CheckboxProps> = ({ ...props }) => {
    const formControlContext = useFormControlContext();

    if (formControlContext === undefined) {
        return null;
    }

    const { value, required, onChange, disabled, onFocus, onBlur } =
        formControlContext;

    let { handler, meta: { item } } = props;

    handler = handler instanceof Function ? handler : () => {};

    const itemHandler = item ? item : { id: '1', value: 'Example' };

    console.log('itemHandler', itemHandler);

    return (
        <Checkbox
            id={itemHandler.id}
            label={itemHandler.value}
            required={required}
            onChange={onChange}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            value={itemHandler.value}
            ripple={true}
            {...handler('checkbox', itemHandler.value)}
        />
    )
};

const CheckboxControl: React.FC<CheckboxProps> = ({ ...props }) => {
    return (
        <FormControl required={true} disabled={false}>
            <CheckboxDefault {...props} />
        </FormControl>
    )
}

export default CheckboxControl;