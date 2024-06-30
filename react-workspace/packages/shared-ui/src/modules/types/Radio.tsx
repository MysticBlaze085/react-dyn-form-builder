import { FormControl, useFormControlContext } from "@mui/base";

import React from "react";

export interface RadioProps {
    handler: () => any;
    meta: {
        item: {
            value: string;
            id: string;
        };
    };
    [key: string]: any; // Allow additional props
}

const Radio: React.FC<RadioProps> = ({ ...props }) => {
    console.log('Props', props)
    const formControlContext = useFormControlContext();

    if (formControlContext === undefined) {
        return null;
    }

    const { value, required, onChange, disabled, onFocus, onBlur } =
        formControlContext;

    const { handler, meta: { item } } = props;

    console.log('Item', item)

    return (
        <div role="button"
            className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <label htmlFor={`vertical-list-${item.id}`} className="flex items-center w-full px-3 py-2 cursor-pointer">
                <div className="grid mr-3 place-items-center">
                    <div className="inline-flex items-center">
                        <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor={`vertical-list-${item.id}`}>
                            <input id={`vertical-list-${item.id}`} type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                required={required}
                                onChange={onChange}
                                disabled={disabled}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                value={item.value}
                                {...handler()}
                            />
                            <span
                                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                            </span>
                        </label>
                    </div>
                </div>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
                    {item.value}
                </p>
            </label>
        </div>
    );
};

const RadioControl:React.FC<RadioProps>  = ({ ...props }) => {
    return (
        <FormControl required={true} disabled={false}>
            <Radio {...props} />
        </FormControl>
    )
}

export default RadioControl;