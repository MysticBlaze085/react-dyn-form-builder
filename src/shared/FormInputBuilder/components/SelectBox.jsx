import React from 'react';

const SelectBox = ({ handler }) => (
    <div>
        <label>Nationality:</label>
        <select {...handler()}>
            <option value="" disabled>
                Select
            </option>
            <option value="us">US</option>
            <option value="uk">UK</option>
            <option value="india">India</option>
            <option value="china">China</option>
        </select>
    </div>
);
export default SelectBox;
