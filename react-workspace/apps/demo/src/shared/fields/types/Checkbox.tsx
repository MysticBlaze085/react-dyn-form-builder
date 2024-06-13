import { FormControl, useFormControlContext } from "@mui/base";

import { Checkbox } from "@material-tailwind/react";
import React from "react";

export interface CheckboxProps {
    handler: () => any;
    meta: {
        item: {
            value: string;
            id: string;
        };
    };
    [key: string]: any; // Allow additional props
}

export const MatTwCheckbox: React.FC<CheckboxProps> = ({ ...props }) => {
    const formControlContext = useFormControlContext();

    if (formControlContext === undefined) {
        return null;
    }

    const { value, required, onChange, disabled, onFocus, onBlur } =
        formControlContext;

    const { handler, meta: { item } } = props;

    return (
        <Checkbox 
            label={item.value ?? value}
            required={required}
            onChange={onChange}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            {...handler()} 
        />
    );
};

const CheckboxControl:React.FC<CheckboxProps>  = ({ ...props }) => {
    return (
        <FormControl required={true} disabled={false}>
            <MatTwCheckbox {...props} />
        </FormControl>
    )
}

export default CheckboxControl;