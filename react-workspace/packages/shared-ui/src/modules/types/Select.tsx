import { FormControl, useFormControlContext } from "@mui/base";
import React, { Suspense } from "react";

const Option = React.lazy(() => import('@material-tailwind/react/components/Select/SelectOption'));
const Select = React.lazy(() => import('@material-tailwind/react/components/Select'));

export interface SelectProps {
    handler: any;
    meta: {
        label: string;
        items: {
            label: string;
            value: string;
        }[];
        hidden?: boolean
    };
    [key: string]: any; // Allow additional props
}

const SelectDefault: React.FC<SelectProps> = ({ ...props }) => {
    const [selectedValue, setValue] = React.useState("react");
    const formControlContext = useFormControlContext();

    if (formControlContext === undefined) {
        return null;
    }

    const { value, required, onChange, disabled, onFocus, onBlur } =
        formControlContext;

    const { handler, meta: { label, items, hidden }, defaultValue } = props;

    React.useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Select
                label={label}
                value={selectedValue}
                onChange={(val) => setValue(val)}
                required={required}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                styles={{ zIndex: 9999, position: 'fixed' }}
                {...handler('select', selectedValue)}
                {...props}
            >
                {
                    items.map((item, index) => (
                        <Option key={item.value || index} value={item.value}>{item.label}</Option>
                    ))
                }
            </Select>
        </Suspense>
    )
};

const SelectControl: React.FC<SelectProps> = ({ ...props }) => {
    return (
        <FormControl className="grow" required={true} disabled={false}>
            <SelectDefault {...props} />
        </FormControl>
    )
}

export default SelectControl;