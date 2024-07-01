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

    const { handler, meta: { item } } = props;

    return (
        <Checkbox
            id={item.id}
            name="type"
            label={item.value}
            required={required}
            onChange={onChange}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            value={item.value}
            ripple={true}
            {...handler('checkbox', item.value)}
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