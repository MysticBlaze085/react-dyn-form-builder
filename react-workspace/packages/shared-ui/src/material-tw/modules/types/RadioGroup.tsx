import React, { Suspense } from "react";
const RadioControl = React.lazy(() => import('./Radio'));

interface RadioGroupProps {
    handler: () => any;
    meta: {
        label: string;
        items: {
            id: string;
            value: string;
        }[];
    };

}

const RadioGroup: React.FC<RadioGroupProps> = ({ ...props }) => {
    const { handler, meta: { label, items } } = props;
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="relative flex flex-col text-gray-700 rounded-xl bg-clip-border mt-4">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        {label}
                    </label>
                    {
                        items && items.length ?
                            items.map((item, index) => (
                                <RadioControl key={index} meta={{ item }} handler={handler} />
                            ))
                            : null
                    }
                </nav>
            </div>
        </Suspense>
    )
};

export default RadioGroup;