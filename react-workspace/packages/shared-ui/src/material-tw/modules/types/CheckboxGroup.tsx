import React, { Suspense } from "react";
const CheckboxControl = React.lazy(() => import('./Checkbox'));

const CheckboxGroup = ({ handler, meta: { items } }) => (
    <Suspense fallback={<div>Loading...</div>}>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border mt-2">
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                {
                    items && items.length ?
                        items.map((item, index) => (
                            <CheckboxControl key={index} handler={handler} meta={{ item }} />
                        ))
                        : null
                }
            </nav>
        </div>
    </Suspense>
);

export default CheckboxGroup;