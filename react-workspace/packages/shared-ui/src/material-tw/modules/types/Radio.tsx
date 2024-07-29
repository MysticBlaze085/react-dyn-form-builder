import { FormControl, useFormControlContext } from "@mui/base";
import React, { Suspense } from "react";
const Radio = React.lazy(() => import('@material-tailwind/react/components/Radio'));

export interface RadioProps {
    handler: any;
    meta: {
        item: {
            value: string;
            id: string;
        };
    };
    [key: string]: any; // Allow additional props
}

const RadioDefault: React.FC<RadioProps> = ({ ...props }) => {
    const formControlContext = useFormControlContext();

    if (formControlContext === undefined) {
        return null;
    }

    const { value, required, onChange, disabled, onFocus, onBlur } = formControlContext;

    const { handler, meta: { item } } = props;

    const itemHandler = item ? item : { id: '1', value: 'Example' };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Radio
                id={itemHandler.id}
                name="type"
                label={itemHandler.value}
                required={required}
                onChange={onChange}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                value={itemHandler.value}
                ripple={true}
                {...handler('radio', itemHandler.value)}
            />
        </Suspense>
    );
};

const RadioControl: React.FC<RadioProps> = ({ ...props }) => {
    return (
        <FormControl defaultValue="" required={true} disabled={false} {...props}>
            <RadioDefault {...props} />
        </FormControl>
    )
}

export default RadioControl;